import { requestService } from '@/services'
import { HandlerResponse } from 'pu-common'

export default class RequestCotroller {
  static save (req, res) {
    requestService.save(req.user._id, req.body)
      .then(data => {
        return HandlerResponse.send(res, {_id: data._id})
      }).catch(reason => {
        return HandlerResponse.error(res, reason)
      })
  }

  static updateById (req, res) {
    let values = req.body
    requestService.updateById(req.params.id, values).then(data => {
      return HandlerResponse.send(res, data)
    }).catch(reason => {
      return HandlerResponse.error(res, reason)
    })
  }

  static getById (req, res) {
    requestService.getById(req.params.id).then(data => {
      return HandlerResponse.send(res, data)
    }).catch(reason => {
      return HandlerResponse.error(res, reason)
    })
  }

  static approve (req, res) {
    requestService.approve(req.params.id).then(data => {
      return HandlerResponse.send(res, data)
    }).catch(reason => {
      if (reason.statusCode && reason.message) {
        return HandlerResponse.error(res, { message: reason.message }, reason.statusCode)
      }
      return HandlerResponse.error(res, reason)
    })
  }
}
