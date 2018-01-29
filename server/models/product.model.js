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

const processingFees = {
  cardFeeActual: { type: Number, required: true },
  cardFeeDisplay: { type: Number, required: true },
  cardFeeFlatActual: { type: Number, required: true },
  cardFeeFlatDisplay: { type: Number, required: true },
  achFeeActual: { type: Number, required: true },
  achFeeDisplay: { type: Number, required: true },
  achFeeFlatActual: { type: Number, required: true },
  achFeeFlatDisplay: { type: Number, required: true },
  achFeeCapActual: { type: Number, required: true },
  achFeeCapDisplay: { type: Number, required: true }
}

const collectionsFee = {
  fee: { type: Number, required: true },
  feeFlat: { type: Number, required: true }
}

const paysFees = {
  processing: { type: Boolean, required: true },
  collections: { type: Boolean, required: true }
}

const schema = {
  paymentId: { type: String, required: true },
  season: { type: String, required: true },
  organizationId: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationLocation: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  visibility: { type: Boolean, required: true, default: true },
  status: { type: Boolean, required: true, default: true },
  image: { type: String, required: true },
  statementDescriptor: { type: String, required: true },
  customInfo: {
    formData: { type: [formData], required: true },
    formTemplate: { type: [formTemplate], required: true }
  },
  processingFees: { type: processingFees, required: true },
  collectionsFee: { type: collectionsFee, required: true },
  paysFees: { type: paysFees, required: true }
}

export default class ProductModel extends CommonModel {
  constructor () {
    super('product', 'products', schema)
  }
}
