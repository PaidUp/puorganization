import { PlanModel } from '@/models'
import CommonService from './common.service'
const planModel = new PlanModel()

export default class PaymentService extends CommonService {
  constructor () {
    super(planModel)
  }
}
