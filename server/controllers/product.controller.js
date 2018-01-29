import { ProductService } from '@/services'
import { HandlerResponse } from '@/util'
const productService = new ProductService()

export default class ProductController {
  static save (req, res) {
    let hr = new HandlerResponse(res)
    const product = req.body
    productService.save(product).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static updateById (req, res) {
    let hr = new HandlerResponse(res)
    const product = req.body
    const productId = req.params.productId
    productService.updateById(productId, product).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getById (req, res) {
    let hr = new HandlerResponse(res)
    const productId = req.params.productId
    productService.getById(productId).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getListByOrganizationId (req, res) {
    let hr = new HandlerResponse(res)
    const organizationId = req.params.organizationId
    if (!organizationId) {
      return hr.error('organizationId is required', 422)
    }
    productService.find({organizationId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getByOrganizationId (req, res) {
    let hr = new HandlerResponse(res)
    const organizationId = req.params.organizationId
    const productId = req.params.productId
    if (!organizationId) {
      return hr.error('organizationId is required', 422)
    }
    if (!productId) {
      return hr.error('productId is required', 422)
    }
    productService.getByIdAndFilter(productId, {organizationId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }
}
