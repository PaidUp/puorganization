import { BeneficiaryModel } from '@/models'
import CommonService from './common.service'
const beneficiaryModel = new BeneficiaryModel()

export default class PaymentService extends CommonService {
  constructor () {
    super(beneficiaryModel)
  }
}
