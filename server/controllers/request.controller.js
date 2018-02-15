import { RequestService } from '@/services'
import { HandlerResponse } from '@/util'
const requestService = new RequestService()

export default class RequestCotroller {
  static save (req, res) {
    let hr = new HandlerResponse(res)
    requestService.save(req.user._id, req.body)
      .then(data => {
        return hr.send({_id: data._id})
      }).catch(reason => {
        return hr.error(reason)
      })
  }

  static updateById (req, res) {
    let hr = new HandlerResponse(res)
    let values = req.body
    requestService.updateById(req.params.id, values).then(data => {
      return hr.send(data)
    }).catch(reason => {
      return hr.error(reason)
    })
  }

  static getById (req, res) {
    let hr = new HandlerResponse(res)
    requestService.getById(req.params.id).then(data => {
      return hr.send(data)
    }).catch(reason => {
      return hr.error(reason)
    })
  }

  static approve (req, res) {
    let hr = new HandlerResponse(res)
    requestService.approve(req.params.id).then(data => {
      return hr.send(data)
    }).catch(reason => {
      if (reason.statusCode && reason.message) {
        return hr.error({ message: reason.message }, reason.statusCode)
      }
      return hr.error(reason)
    })
  }
}
