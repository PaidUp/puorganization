import { RequestModel } from '@/models'
import CommonService from './common.service'
import { Ncryp, Stripe } from '@/util'
import OrganizationService from './organization.service'
const requestModel = new RequestModel()
const organizationService = new OrganizationService()
const stripe = new Stripe('sk_test_wE4QBHe2SZH9wZ6uMZliup0g')

function buildConnectAccountPayload (request) {
  return {
    type: 'custom',
    country: 'US',
    email: request.ownerEmail,
    business_name: request.businessName,
    business_url: request.businessUrl,
    legal_entity: {
      business_name: request.businessName,
      business_tax_id: request.businessTaxId,
      ssn_last_4: Ncryp.decryptField(request.ownerSSN),
      first_name: request.ownerFirstName,
      last_name: request.ownerLastName,
      phone_number: request.ownerPhone,
      type: request.type,
      dob: {
        day: request.ownerDOB.getDate(),
        month: (request.ownerDOB.getMonth() + 1),
        year: request.ownerDOB.getFullYear()
      },
      address: {
        city: request.city,
        country: request.country,
        line1: request.address,
        line2: request.address2,
        postal_code: request.zipCode,
        state: request.state
      }
    },
    external_account: {
      object: 'bank_account',
      account_number: Ncryp.decryptField(request.accountNumber),
      routing_number: Ncryp.decryptField(request.routingNumber),
      country: 'US',
      currency: 'usd'
    }
  }
}

function buildOrganizationPayload (request) {
  return {
    connectAccount: request.connectAccount,
    ownerFirstName: request.ownerFirstName,
    ownerLastName: request.ownerLastName,
    ownerDOB: request.ownerDOB,
    image: request.image,
    ownerEmail: request.ownerEmail,
    ownerPhone: request.ownerPhone,
    state: request.state,
    city: request.state,
    zipCode: request.zipCode,
    address: request.address,
    address2: request.address2,
    businessName: request.businessName,
    type: request.type,
    seasons: [],
    businessUrl: request.businessUrl,
    country: request.country,
    keySecret: request.keySecret,
    keyPublic: request.keyPublic,
    status: 'active'
  }
}

export default class RequestService extends CommonService {
  constructor () {
    super(requestModel)
  }
  save (userId, data) {
    data.userId = userId
    data.routingNumber = Ncryp.encryptField(data.routingNumber)
    data.accountNumber = Ncryp.encryptField(data.accountNumber)
    data.ownerSSN = Ncryp.encryptField(data.ownerSSN)
    return requestModel.save(data).then(data => data)
  }

  updateById (id, data) {
    if (data.routingNumber) data.routingNumber = Ncryp.encryptField(data.routingNumber)
    if (data.accountNumber) data.accountNumber = Ncryp.encryptField(data.accountNumber)
    if (data.ownerSSN) data.ownerSSN = Ncryp.encryptField(data.ownerSSN)
    return requestModel.updateById(id, data).then(data => data)
  }

  approve (id) {
    return new Promise((resolve, reject) => {
      this.getById(id).then(request => {
        /* eslint prefer-promise-reject-errors: "error" */
        if (!request) return reject(new Error('request id invalid'))
        let payload = buildConnectAccountPayload(request)
        stripe.createConnectAccount(payload).then(data => {
          request.connectAccount = data.keySecret = data.id
          request.keySecret = data.keySecret = data.keys.secret
          request.keyPublic = data.keys.publishable
          let organization = buildOrganizationPayload(request)
          organizationService.save(organization).then(data => {
            requestModel.updateById(id, {status: 'approved'})
              .then(reqApproved => resolve(reqApproved))
              .catch(reason => reject(reason))
          })
        }).catch(reason => reject(reason))
      }).catch(reason => reject(reason))
    })
  }
}
