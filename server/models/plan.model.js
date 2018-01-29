import CommonModel from './common.model'

const dues = {
  version: { type: String, required: true, default: 'v2' },
  description: { type: String, required: true },
  dateCharge: { type: Date, required: true },
  amount: { type: Number, required: true }
}

const schema = {
  key: { type: String, required: true },
  productId: { type: String, required: true },
  description: { type: String, required: true },
  visible: { type: Boolean, required: true },
  paymentMethods: { type: [String], enum: ['bank', 'card'], lowercase: true },
  dues: { type: [dues], required: true }
}

export default class PlanModel extends CommonModel {
  constructor () {
    super('plan', 'plans', schema)
  }
}
