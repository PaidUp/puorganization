import { OrganizationModel } from '@/models'
import CommonService from './common.service'
import { Ncryp } from '@/util'
const organizationModel = new OrganizationModel()

export default class OrganizationService extends CommonService {
  constructor () {
    super(organizationModel)
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
