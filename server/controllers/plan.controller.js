import { PlanService } from '@/services'
import { HandlerResponse } from '@/util'
const planService = new PlanService()

export default class PlanController {
  static save (req, res) {
    let hr = new HandlerResponse(res)
    const payment = req.body
    planService.save(payment).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static updateById (req, res) {
    let hr = new HandlerResponse(res)
    const payment = req.body
    const planId = req.params.planId
    planService.updateById(planId, payment).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getById (req, res) {
    let hr = new HandlerResponse(res)
    const planId = req.params.planId
    planService.getById(planId).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static join (req, res) {
    let hr = new HandlerResponse(res)
    const planId = req.params.planId
    planService.join(planId).then(result => {
      hr.send(result)
    }).catch(reason => {
      console.log('REASon:', reason)
      hr.error(reason)
    })
  }

  static getListByProductId (req, res) {
    let hr = new HandlerResponse(res)
    const productId = req.params.productId
    if (!productId) {
      return hr.error('organizationId is required', 422)
    }
    planService.find({productId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getByProductId (req, res) {
    let hr = new HandlerResponse(res)
    const productId = req.params.productId
    const planId = req.params.planId
    if (!planId) {
      return hr.error('planId is required', 422)
    }
    if (!productId) {
      return hr.error('productId is required', 422)
    }
    planService.getByIdAndFilter(planId, {productId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }
}
