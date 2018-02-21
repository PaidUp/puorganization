import { ProductModel } from '@/models'
import CommonService from './common.service'
import config from '@/config/environment'
const productModel = new ProductModel()
let productService

class ProductService extends CommonService {
  constructor () {
    super(productModel)
  }

  static get instance () {
    if (!productService) {
      productService = new ProductService()
    }
    return productService
  }

  save (entity) {
    entity.collectFees = config.collectFees
    return productModel.save(entity)
  }
}

export default ProductService.instance
