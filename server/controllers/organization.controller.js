import { OrganizationService } from '@/services'
import { HandlerResponse } from 'pu-common'
const organizationService = new OrganizationService()

export default class OrganizationCotroller {
  static updateById (req, res) {
    let values = req.body
    organizationService.updateById(req.params.organizationId, values).then(organization => {
      return HandlerResponse.send(res, organization)
    }).catch(reason => {
      return HandlerResponse.error(res, reason)
    })
  }

  static getById (req, res) {
    organizationService.getById(req.params.organizationId).then(organization => {
      return HandlerResponse.send(res, organization)
    }).catch(reason => {
      return HandlerResponse.error(res, reason)
    })
  }
}
