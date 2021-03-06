import { RequestModel } from '@/models'
import CommonService from './common.service'
import { Ncryp } from 'pu-common'
import organizationService from './organization.service'
import config from '@/config/environment'
import axios from 'axios'

let requestService
let apiPayment = axios.create({
  baseURL: config.api.payment.url,
  timeout: 10000,
  headers: {'x-api-key': config.auth.key}
})

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

function createConnectAccount (request) {
  const payload = {
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

  return new Promise((resolve, reject) => {
    apiPayment.post('/account', payload)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

class RequestService extends CommonService {
  constructor () {
    super(new RequestModel())
  }

  save (userId, data) {
    data.userId = userId
    data.routingNumber = Ncryp.encryptField(data.routingNumber)
    data.accountNumber = Ncryp.encryptField(data.accountNumber)
    data.ownerSSN = Ncryp.encryptField(data.ownerSSN)
    return this.model.save(data).then(data => data)
  }

  updateById (id, data) {
    if (data.routingNumber) data.routingNumber = Ncryp.encryptField(data.routingNumber)
    if (data.accountNumber) data.accountNumber = Ncryp.encryptField(data.accountNumber)
    if (data.ownerSSN) data.ownerSSN = Ncryp.encryptField(data.ownerSSN)
    return this.model.updateById(id, data).then(data => data)
  }

  approve (id) {
    return new Promise((resolve, reject) => {
      let req
      this.getById(id).then(request => {
        req = request
        /* eslint prefer-promise-reject-errors: "error" */
        if (!req) return reject(new Error('request id invalid'))
        return createConnectAccount(req)
      }).then(data => {
        req.connectAccount = data.keySecret = data.id
        req.keySecret = data.keySecret = data.keys.secret
        req.keyPublic = data.keys.publishable
        let organization = buildOrganizationPayload(req)
        return organizationService.save(organization)
      }).then(data => {
        return this.model.updateById(id, {organizationId: data._id, status: 'approved'})
      }).then(reqApproved => resolve(reqApproved))
        .catch(reason => reject(reason))
    })
  }
}

requestService = new RequestService()

export default requestService
