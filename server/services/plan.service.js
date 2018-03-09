import { PlanModel } from '@/models'
import CommonService from './common.service'
import productService from './product.service'
import organizationService from './organization.service'

class PaymentService extends CommonService {
  constructor () {
    super(new PlanModel())
  }

  join (planId) {
    return new Promise((resolve, reject) => {
      let res = {}
      this.model.findById(planId).then(plan => {
        res.plan = plan
        return productService.getById(plan.productId)
      }).then(product => {
        res.product = product
        return organizationService.getById(product.organizationId)
      }).then(organization => {
        res.organization = organization
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  }
}

let paymentService = new PaymentService()

export default paymentService
