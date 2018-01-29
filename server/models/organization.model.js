import CommonModel from './common.model'

const schema = {
  ownerId: { type: String },
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  ownerDOB: { type: Date },
  ownerSSN: { type: String, required: true },
  ownerEmail: { type: String },
  ownerPhone: { type: String },
  country: { type: String, default: 'US' },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  averagePayment: { type: String, default: '1' },
  EIN: { type: String },
  Address: { type: String, required: true },
  AddressLineTwo: { type: String },
  website: { type: String, default: 'https://www.getpaidup.com' },
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  aba: { type: String, required: true },
  dda: { type: String, required: true },
  updateAt: { type: Date, default: new Date() },
  verify: { type: String, default: 'pending' },
  referralCode: { type: String, default: '' },
  paymentId: { type: String, default: '' },
  seasons: { type: [String], default: [] }
}

export default class OrganizationModel extends CommonModel {
  constructor () {
    super('organization', 'organizations', schema)
  }
}
