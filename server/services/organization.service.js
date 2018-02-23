import { OrganizationModel } from '@/models'
import CommonService from './common.service'
import { Ncryp } from 'pu-common'

class OrganizationService extends CommonService {
  constructor () {
    super(new OrganizationModel())
  }

  save (data) {
    data.keySecret = Ncryp.encryptField(data.keySecret)
    return this.model.save(data).then(org => org)
  }

  getById (entityId) {
    return this.model.findById(entityId).then(entity => {
      entity = entity.toObject()
      delete entity.keyPublic
      delete entity.keySecret
      return entity
    })
  }
}

let organizationService = new OrganizationService()

export default organizationService
