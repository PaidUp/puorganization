import { BeneficiaryModel } from '@/models'
import CommonService from './common.service'
import organizationService from './organization.service'
import stream from 'stream'
import csv from 'fast-csv'
import emailValidator from 'email-validator'
import { Email } from 'pu-common'
import config from '@/config/environment'
import { Parser as Json2csvParser } from 'json2csv'

const email = new Email(config.email.options)

class BeneficiaryService extends CommonService {
  constructor () {
    super(new BeneficiaryModel())
  }

  import (beneficiaries) {
    return new Promise((resolve, reject) => {
      try {
        const bulk = this.bulk
        for (let { organizationId, organizationName, firstName, lastName, assigneesEmail } of beneficiaries) {
          bulk.find({ organizationId, firstName, lastName }).upsert().updateOne(
            {
              $set: { organizationId, organizationName, firstName, lastName, avatar: 'default.png', type: 'athlete', status: 'active' }
            }
          )
          if (assigneesEmail) {
            bulk.find({ organizationId, firstName, lastName }).upsert().updateOne(
              {
                $addToSet: { assigneesEmail }
              }
            )
          }
        }
        bulk.execute(res => resolve(res))
      } catch (err) {
        reject(err)
      }
    })
  }

  bulkBeneficiaries (buffer, userEmail) {
    let model = this.model
    let result = []
    let bufferStream = new stream.PassThrough()
    bufferStream.end(buffer)

    return new Promise((resolve, reject) => {
      try {
        organizationService.find({}).then(organizations => {
          const mapOrganizations = organizations.reduce((curr, organization) => {
            curr[organization.businessName] = organization._id
            return curr
          }, {})
          csv.fromStream(bufferStream, {headers: true})
            .transform((data, next) => {
              data.beneficiaryId = ''
              const organizationId = mapOrganizations[data.organization.trim()]
              if (!organizationId) {
                data.status = 'Invalid organization'
                return next(null, data)
              }
              const parentEmail = data.parentEmail.trim().toLowerCase()
              if (!emailValidator.validate(parentEmail)) {
                data.status = 'Invalid email'
                return next(null, data)
              }
              const filter = {
                firstName: data.beneficiaryFirstName.trim(),
                lastName: data.beneficiaryLastName.trim(),
                organizationName: data.organization.trim()
              }
              model.findOne(filter).then(beneficiary => {
                if (!beneficiary) {
                  filter.organizationId = organizationId
                  filter.organizationName = data.organization.trim()
                  filter.type = 'athlete'
                  filter.status = 'active'
                  filter.assigneesEmail = [parentEmail]
                  model.save(filter).then(res => {
                    data.beneficiaryId = res._id
                    data.status = 'Beneficiary added'
                    return next(null, data)
                  }).catch(reason => {
                    data.status = reason.toString()
                    return next(null, data)
                  })
                } else if (beneficiary.assigneesEmail.includes(parentEmail)) {
                  data.beneficiaryId = beneficiary._id
                  data.status = 'Beneficiary exists, email exists'
                  return next(null, data)
                } else {
                  beneficiary.assigneesEmail.push(parentEmail)
                  beneficiary.save((err, res) => {
                    data.beneficiaryId = beneficiary._id
                    if (err) {
                      data.status = err.toString()
                      return next(null, data)
                    }
                    data.status = 'Beneficiary exists, email added'
                    return next(null, data)
                  })
                }
              })
            })
            .on('data', function (data) {
              result.push(data)
            })
            .on('end', function () {
              const fields = ['beneficiaryId', 'beneficiaryFirstName', 'beneficiaryLastName', 'organization', 'parentEmail', 'status']
              const json2csvParser = new Json2csvParser({ fields })
              const csv = json2csvParser.parse(result)
              const attachment = {
                content: Buffer.from(csv).toString('base64'),
                fileName: 'BeneficiaryResult.csv',
                type: 'application/octet-stream'
              }
              email.sendEmail(userEmail, 'Beneficiary Result', 'Hi,<br> The beneficiary bulk result was attached', [attachment])
              resolve(csv)
            })
        })
      } catch (reason) {
        reject(reason)
      }
    })
  }
}

let beneficiaryService = new BeneficiaryService()

export default beneficiaryService
