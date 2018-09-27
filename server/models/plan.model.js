import CommonModel from './common.model'
import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

const dues = {
  description: { type: String, required: true },
  dateCharge: { type: Date, required: true },
  maxDateCharge: { type: Date },
  tags: { type: [String] },
  amount: { type: Number, required: true }
}

const credits = {
  description: { type: String, required: true },
  dateCharge: { type: Date, required: true },
  amount: { type: Number, required: true },
  tags: { type: [String] },
  status: { type: String, enum: ['paid', 'credited', 'refunded', 'discount'], required: true }
}

const schema = {
  key: { type: String, required: true },
  productId: { type: ObjectId, required: true, ref: 'pu_organization_products' },
  description: { type: String, required: true },
  visible: { type: Boolean, required: true },
  groupId: { type: String },
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
