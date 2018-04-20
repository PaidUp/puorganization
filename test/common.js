const chai = require('chai')
const axios = require('axios')
const chaiHttp = require('chai-http')
const uuidv4 = require('uuid/v4')
const server = require('../server/app').default
const should = chai.should()
const config = require('../server/config/environment').default
let token
const results = {
  organization: {},
  product: {},
  plan: {},
  request: {},
  beneficiary: {}
}

results.request.payload = {
  userId: '59af4f5d5d31df6d2db0f265',
  ownerFirstName: 'Ricardo',
  ownerLastName: 'Lara',
  image: 'img',
  ownerDOB: '1979-04-17T03:00:00.000Z',
  ownerSSN: '0000',
  ownerEmail: 'riclara222@gmail.com',
  ownerPhone: '3017718888',
  country: 'US',
  state: 'AK',
  city: 'Enviado',
  zipCode: '60137',
  businessTaxId: '111111111',
  address: 'Cll 40aa Sur # 32 70, 306',
  address2: '',
  businessUrl: 'https://www.getpaidup.com',
  businessName: 'Test',
  type: 'company',
  routingNumber: '110000000',
  accountNumber: '000123456789'
}

results.organization.payload = {
  connectAccount: 'acct_18OZ8zIhv1Yesxk9',
  ownerFirstName: 'Ricardo',
  ownerLastName: 'Lara',
  ownerDOB: '1979-04-17T03:00:00.000Z',
  image: 'img',
  ownerEmail: 'riclara222@gmail.com',
  ownerPhone: '3017718888',
  state: 'AK',
  city: 'Enviado',
  zipCode: '00000',
  address: 'Cll 40aa Sur # 32 70, 306',
  address2: '',
  businessName: 'Test',
  type: '',
  seasons: ['Season A', 'Season B'],
  businessUrl: 'https://www.getpaidup.com',
  country: 'US',
  keySecret: 'aaa',
  keyPublic: 'public',
  status: 'active'
}

results.product.payload = {
  season: 'test',
  sku: 'TX - SAN ANTONIO - COBRAS VOLLEYBALL - 17 BLACK PREMIER 2016',
  name: '17 Black (Premier)',
  description: 'Cobras Volleyball Club',
  organizationLocation: 'San Antonio, TX',
  description: '17 Black (Premier)',
  image: 'value image url',
  statementDescriptor: 'PaidUp Cobras 17 Black',
  status: 'active',
  customInfo: {
    formData: [],
    formTemplate: [
      {
        type: 'text',
        placeholder: 'Athlete First Name',
        name: 'Athlete First Name',
        model: 'athleteFirstName',
        displayed: true,
        required: true
      },
      {
        type: 'text',
        placeholder: 'Athlete Last Name',
        name: 'Athlete Last Name',
        model: 'athleteLastName',
        displayed: true,
        required: true
      }
    ]
  },
  processingFees: {
    cardFee: 2.9,
    cardFeeFlat: 0.3,
    achFee: 2.3,
    achFeeFlat: 0,
    achFeeCap: 5
  },
  payFees: {
    processing: true,
    collect: true
  }
}

results.plan.payload = {
  key: 'monthly',
  description: 'Monthly Payments',
  paymentMethods: ['card'],
  visible: true,
  status: 'active',
  dues: [
    {
      description: 'Deposit 1',
      dateCharge: '2017-01-01 10:00',
      maxDateCharge: '2017-01-15 10:00',
      amount: 500.0
    },
    {
      description: 'Payment 1 of 5',
      dateCharge: '2017-09-01 10:00',
      amount: 500.0
    },
    {
      description: 'Payment 2 of 5',
      dateCharge: '2017-10-01 10:00',
      amount: 450.0
    },
    {
      description: 'Payment 3 of 5',
      dateCharge: '2017-11-01 10:00',
      amount: 400.0
    },
    {
      description: 'Payment 4 of 5',
      dateCharge: '2017-12-01 10:00',
      amount: 300.0
    },
    {
      description: 'Payment 5 of 5',
      dateCharge: '2017-01-01 10:00',
      amount: 100.0
    }
  ]
}

results.beneficiary.payload = {
  type: 'athlete',
  firstName: 'John Doe Jr',
  lastName: 'John Doe Jr',
  description: 'some description',
  status: 'active',
  assigneesEmail: uuidv4()+'@test.com'
}

results.beneficiary.imports = [
  { organizationId: 'xxx', firstName: 'testFirsName1', lastName: 'testLastName1', assigneesEmail: 'email@test.com1' },
  { organizationId: 'xxx', firstName: 'testFirsName2', lastName: 'testLastName2', assigneesEmail: 'email@test.com1' },
  { organizationId: 'xxx', firstName: 'testFirsName3', lastName: 'testLastName3', assigneesEmail: 'email@test.com1' }
]

axios.post('https://devapi.getpaidup.com/api/v1/user/login/email', {
      email: 'test@getpaidup.com',
      password: 'test123',
      rememberMe: false
    })
    .then(function (response) {
      token = 'Bearer ' + response.data.token
    })
    .catch(function (error) {
      console.log(error);
    });


chai.use(chaiHttp)

exports.chai = chai
exports.server = server
exports.should = should
exports.token = function () { return token }
exports.results = results
