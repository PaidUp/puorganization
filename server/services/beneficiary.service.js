import { BeneficiaryModel } from '@/models'
import CommonService from './common.service'
const beneficiaryModel = new BeneficiaryModel()
let paymentService

class PaymentService extends CommonService {
  constructor () {
    super(beneficiaryModel)
  }

  static get instance () {
    if (!paymentService) {
      paymentService = new PaymentService()
    }
    return paymentService
  }
}

export default PaymentService.instance
