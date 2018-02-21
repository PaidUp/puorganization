import { OrganizationModel } from '@/models'
import CommonService from './common.service'
import { Ncryp } from 'pu-common'
const organizationModel = new OrganizationModel()
let organizationService

class OrganizationService extends CommonService {
  constructor () {
    super(organizationModel)
  }

  static get instance () {
    if (!organizationService) {
      organizationService = new OrganizationService()
    }
    return organizationService
  }

  save (data) {
    data.keySecret = Ncryp.encryptField(data.keySecret)
    return organizationModel.save(data).then(org => org)
  }

  getById (entityId) {
    return organizationModel.findById(entityId).then(entity => {
      entity = entity.toObject()
      delete entity.keyPublic
      delete entity.keySecret
      return entity
    })
  }
}

export default OrganizationService.instance
