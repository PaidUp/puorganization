import { productService } from '@/services'
import { HandlerResponse } from 'pu-common'

export default class ProductController {
  static save (req, res) {
    const product = req.body
    productService.save(product).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static updateById (req, res) {
    const product = req.body
    const productId = req.params.productId
    productService.updateById(productId, product).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getById (req, res) {
    const productId = req.params.productId
    productService.getById(productId).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getListByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    if (!organizationId) {
      return HandlerResponse.error(res, 'organizationId is required', 422)
    }
    productService.find({organizationId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getAll (req, res) {
    productService.find({}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    const productId = req.params.productId
    if (!organizationId) {
      return HandlerResponse.error(res, 'organizationId is required', 422)
    }
    if (!productId) {
      return HandlerResponse.error(res, 'productId is required', 422)
    }
    productService.getByIdAndFilter(productId, {organizationId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }
}
