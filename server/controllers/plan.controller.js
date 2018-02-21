import { planService } from '@/services'
import { HandlerResponse } from 'pu-common'

export default class PlanController {
  static save (req, res) {
    const payment = req.body
    planService.save(payment).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static updateById (req, res) {
    const plan = req.body
    const planId = req.params.planId
    planService.updateById(planId, plan).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getById (req, res) {
    const planId = req.params.planId
    planService.getById(planId).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static join (req, res) {
    const planId = req.params.planId
    planService.join(planId).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      console.log('REASon:', reason)
      HandlerResponse.error(res, reason)
    })
  }

  static getListByProductId (req, res) {
    const productId = req.params.productId
    if (!productId) {
      return HandlerResponse.error(res, 'productId is required', 422)
    }
    planService.find({productId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getByProductId (req, res) {
    const productId = req.params.productId
    const planId = req.params.planId
    if (!planId) {
      return HandlerResponse.error(res, 'planId is required', 422)
    }
    if (!productId) {
      return HandlerResponse.error(res, 'productId is required', 422)
    }
    planService.getByIdAndFilter(planId, {productId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }
}
