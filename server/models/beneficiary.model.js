import CommonModel from './common.model'

const schema = {
  organizationId: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, required: true, enum: ['athlete'] },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' }
}

export default class BeneficiaryModel extends CommonModel {
  constructor () {
    super('beneficiary', 'beneficiaries', schema)
  }
}
