import { PlanModel } from '@/models'
import CommonService from './common.service'
import productService from './product.service'
import organizationService from './organization.service'
const planModel = new PlanModel()
let paymentService

class PaymentService extends CommonService {
  constructor () {
    super(planModel)
  }

  static get instance () {
    if (!paymentService) {
      paymentService = new PaymentService()
    }
    return paymentService
  }

  join (planId) {
    return new Promise((resolve, reject) => {
      planModel.findById(planId).then(plan => {
        productService.getById(plan.productId).then(product => {
          organizationService.getById(product.organizationId).then(organization => {
            resolve({
              plan, product, organization
            })
          }).catch(reason => reject(reason))
        }).catch(reason => reject(reason))
      }).catch(reason => reject(reason))
    })
  }
}

export default PaymentService.instance
