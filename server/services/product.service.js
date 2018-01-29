import { ProductModel } from '@/models'
import CommonService from './common.service'
const productModel = new ProductModel()

export default class ProductService extends CommonService {
  constructor () {
    super(productModel)
  }
}
