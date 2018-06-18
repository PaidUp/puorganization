import CommonModel from './common.model'
import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

const dues = {
  description: { type: String, required: true },
  dateCharge: { type: Date, required: true },
  maxDateCharge: { type: Date },
  amount: { type: Number, required: true }
}

const credits = {
  description: { type: String, required: true },
  dateCharge: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'credited', 'partially_refunded', 'refunded', 'discount'], required: true }
}

const schema = {
  key: { type: String, required: true },
  productId: { type: ObjectId, required: true, ref: 'pu_organization_products' },
  description: { type: String, required: true },
  visible: { type: Boolean, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'] },
  paymentMethods: { type: [String], enum: ['bank', 'card'], lowercase: true },
  dues: { type: [dues], required: true },
  credits: { type: [credits] }
}

export default class PlanModel extends CommonModel {
  constructor () {
    super('plan', 'plans', schema)
  }
}
