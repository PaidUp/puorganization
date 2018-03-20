import { organizationService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class OrganizationCotroller {
  static updateById (req, res) {
    let values = req.body
    organizationService.updateById(req.params.organizationId, values)
      .then(organization => HR.send(res, organization))
      .catch(reason => HR.error(res, reason))
  }

  static getById (req, res) {
    organizationService.getById(req.params.organizationId)
      .then(organization => HR.send(res, organization))
      .catch(reason => HR.error(res, reason))
  }

  static getAll (req, res) {
    organizationService.find({})
      .then(organizations => HR.send(res, organizations))
      .catch(reason => HR.error(res, reason))
  }

  static uploadLogo (req, res) {
    HR.send(res, req.files[0])
  }

  static updateLogo (req, res) {
    const organizationId = req.body.organizationId
    if (!organizationId) return HR.error(res, 'organizationId is required', 422)
    organizationService.updateById(organizationId, { image: req.files[0].key })
      .then(organization => HR.send(res, organization))
      .catch(reason => HR.error(res, reason))
  }
}
