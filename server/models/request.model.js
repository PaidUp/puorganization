import CommonModel from './common.model'

const schema = {
  userId: { type: String, required: true },
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  image: { type: String, required: true },
  ownerDOB: { type: Date },
  ownerSSN: { type: String, required: true },
  ownerEmail: { type: String },
  ownerPhone: { type: String },
  country: { type: String, default: 'US' },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  businessTaxId: { type: String, required: true },
  address: { type: String, required: true },
  address2: { type: String },
  businessUrl: { type: String, default: '' },
  businessName: { type: String, required: true },
  type: { type: String, enum: ['individual', 'company'], default: 'company' },
  routingNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
  createOn: { type: Date, default: Date.now },
  updateOn: { type: Date, default: Date.now }
}

export default class OrganizationModel extends CommonModel {
  constructor () {
    super('request', 'requests', schema)
  }
}
