import { BeneficiaryModel } from '@/models'
import CommonService from './common.service'

class PaymentService extends CommonService {
  constructor () {
    super(new BeneficiaryModel())
  }

  import (beneficiaries) {
    return new Promise((resolve, reject) => {
      try {
        const bulk = this.bulk
        for (let { organizationId, firstName, lastName, assigneesEmail } of beneficiaries) {
          const key = `${organizationId.toLowerCase().trim()}_${firstName.toLowerCase().trim()}_${lastName.toLowerCase().trim()}`
          bulk.find({ key }).upsert().updateOne(
            {
              $set: { organizationId, firstName, lastName, key, type: 'athlete', status: 'active' }
            }
          )
          if (assigneesEmail) {
            bulk.find({ key }).upsert().updateOne(
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
}

let paymentService = new PaymentService()

export default paymentService
