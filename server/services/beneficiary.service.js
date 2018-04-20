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
}

let paymentService = new PaymentService()

export default paymentService
