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
}
