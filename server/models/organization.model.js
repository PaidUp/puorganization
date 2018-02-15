import CommonModel from './common.model'

const schema = {
  connectAccount: { type: String, required: true },
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  image: { type: String, required: true },
  ownerDOB: { type: Date },
  ownerEmail: { type: String },
  ownerPhone: { type: String },
  country: { type: String, default: 'US' },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  address2: { type: String },
  buisnessUrl: { type: String, default: '' },
  businessName: { type: String, required: true },
  type: { type: String, required: true },
  keySecret: { type: String, required: true },
  keyPublic: { type: String, required: true },
  seasons: { type: [String], default: [] },
  status: { type: [String], required: true, enum: ['active', 'inactive'] }
}

export default class OrganizationModel extends CommonModel {
  constructor () {
    super('organization', 'organizations', schema)
  }
}
