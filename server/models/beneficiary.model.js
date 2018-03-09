import CommonModel from './common.model'

const schema = {
  organizationId: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, required: true, enum: ['athlete'] },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String },
  assigneesEmail: { type: [String], required: true, default: [] },
  status: { type: String, required: true, enum: ['active', 'inactive'] }
}

export default class BeneficiaryModel extends CommonModel {
  constructor () {
    super('beneficiary', 'beneficiaries', schema)
  }
}
