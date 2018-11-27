import { BeneficiaryModel } from '@/models'
import CommonService from './common.service'

class BeneficiaryService extends CommonService {
  constructor () {
    super(new BeneficiaryModel())
  }

  saveOrUpdate ({firstName, lastName, organizationName, organizationId, assigneesEmail}) {
    assigneesEmail = assigneesEmail.toLowerCase()
    const filter = { firstName, lastName, organizationName }
    let model = this.model
    return new Promise((resolve, reject) => {
      model.findOne(filter).then(beneficiary => {
        if (!beneficiary) {
          filter.organizationId = organizationId
          filter.type = 'athlete'
          filter.status = 'active'
          filter.assigneesEmail = [assigneesEmail]
          model.save(filter).then(res => {
            resolve({message: 'Beneficiary added.', beneficiary: res})
          }).catch(reason => {
            reject(reason)
          })
        } else if (beneficiary.assigneesEmail.includes(assigneesEmail)) {
          resolve({message: 'Beneficiary exists, email exists.', beneficiary})
        } else {
          beneficiary.assigneesEmail.push(assigneesEmail)
          beneficiary.save((err, res) => {
            if (err) {
              reject(err)
            }
            resolve({message: 'Beneficiary exists, email added.', beneficiary})
          })
        }
      })
    })
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

  search (criteria) {
    return this.model.find({
      $or: [
        {firstName: new RegExp(criteria, 'i')},
        {lastName: new RegExp(criteria, 'i')},
        {assigneesEmail: new RegExp('^' + criteria + '$', 'i')}
      ]
    })
  }

  updateAssigneesEmail (oldEmail, newEmail) {
    return this.model.updateAssigneesEmail(oldEmail, newEmail)
  }

  updateAddAssigneeEmail ({id, email}) {
    return this.model.updateById(id, {}, {assigneesEmail: email})
  }
}

let beneficiaryService = new BeneficiaryService()

export default beneficiaryService
