import { ProductModel } from '@/models'
import CommonService from './common.service'
import config from '@/config/environment'
const productModel = new ProductModel()

export default class ProductService extends CommonService {
  constructor () {
    super(productModel)
  }

  save (entity) {
    entity.collectFees = config.collectFees
    return productModel.save(entity)
  }
}
