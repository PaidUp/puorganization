import CommonModel from './common.model'

const formData = {
  model: { type: String, required: true },
  value: { type: String, required: true }
}

const formTemplate = {
  type: { type: String, required: true },
  placeholder: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  displayed: { type: Boolean, required: true },
  required: { type: Boolean, required: true }
}

const customInfo = {
  formData: { type: [ formData ], required: true },
  formTemplate: { type: [ formTemplate ], required: true }
}

const processingFees = {
  cardFee: { type: Number, required: true },
  cardFeeFlat: { type: Number, required: true },
  achFee: { type: Number, required: true },
  achFeeFlat: { type: Number, required: true },
  achFeeCap: { type: Number, required: true }
}

const collectFees = {
  fee: { type: Number, required: true },
  feeFlat: { type: Number, required: true }
}

const payFees = {
  processing: { type: Boolean, required: true },
  collect: { type: Boolean, required: true }
}

const schema = {
  organizationId: { type: String, required: true },
  season: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  statementDescriptor: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'] },
  customInfo: { type: customInfo },
  processingFees: { type: processingFees, required: true },
  collectFees: { type: collectFees, required: true },
  payFees: { type: payFees, required: true },
  unbundle: { type: Boolean }
}

export default class ProductModel extends CommonModel {
  constructor () {
    super('product', 'products', schema)
  }
}
