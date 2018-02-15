import { PlanModel } from '@/models'
import CommonService from './common.service'
import ProductService from './product.service'
import OrganizationService from './organization.service'
const planModel = new PlanModel()
const productService = new ProductService()
const organizationService = new OrganizationService()

export default class PaymentService extends CommonService {
  constructor () {
    super(planModel)
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
