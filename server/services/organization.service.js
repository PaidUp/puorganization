import { OrganizationModel } from '@/models'
import CommonService from './common.service'
import { Ncryp } from '@/util'
const organizationModel = new OrganizationModel()

export default class OrganizationService extends CommonService {
  constructor () {
    super(organizationModel)
  }
  save (userId, dataOrganization) {
    dataOrganization.ownerId = userId
    dataOrganization.aba = Ncryp.encryptField(dataOrganization.aba)
    dataOrganization.dda = Ncryp.encryptField(dataOrganization.dda)
    dataOrganization.ownerSSN = Ncryp.encryptField(dataOrganization.ownerSSN)
    return organizationModel.save(dataOrganization).then(data => data)
  }
}
