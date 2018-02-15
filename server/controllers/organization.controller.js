import { OrganizationService } from '@/services'
import { HandlerResponse } from '@/util'
const organizationService = new OrganizationService()

export default class OrganizationCotroller {
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
