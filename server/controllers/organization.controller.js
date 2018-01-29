import { OrganizationService } from '@/services'
import { HandlerResponse } from '@/util'
const organizationService = new OrganizationService()

export default class OrganizationCotroller {
  static save (req, res) {
    let hr = new HandlerResponse(res)
    organizationService.save(req.body.userId, req.body.organizationInfo)
      .then(organization => {
        return hr.send({organizationId: organization._id})
      }).catch(reason => {
        return hr.error(reason)
      })
  }

  static updatePaymentId (req, res) {
    let hr = new HandlerResponse(res)
    let values = {verify: 'done', aba: '', dda: '', ownerSSN: '', paymentId: req.params.paymentId}
    organizationService.updateById(req.params.organizationId, values).then(organization => {
      if (!organization) {
        return hr.error({name: 'ValidationError', message: 'organization was processed', errors: 'organization does not exists or was processed'}, 400)
      }
      return hr.send(organization)
    }).catch(reason => {
      return hr.error(reason)
    })
  }

  static updateById (req, res) {
    let hr = new HandlerResponse(res)
    let values = req.body
    organizationService.updateById(req.params.organizationId, values).then(organization => {
      return hr.send(organization)
    }).catch(reason => {
      return hr.error(reason)
    })
  }

  static getById (req, res) {
    let hr = new HandlerResponse(res)
    organizationService.getById(req.params.organizationId).then(organization => {
      return hr.send(organization)
    }).catch(reason => {
      return hr.error(reason)
    })
  }
}
