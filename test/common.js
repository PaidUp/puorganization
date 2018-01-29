let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
let should = chai.should()
let token = require('../server/config/environment').default.nodePass.me.token
let results = {
  organization: {},
  product: {},
  plan: {}
}

results.organization.payload = {
  userId: '33333',
  organizationInfo: {
    ownerFirstName: 'Ricardo',
    ownerLastName: 'Lara',
    ownerDOB: '2017-04-17T03:00:00.000Z',
    ownerSSN: 'uVOoJjSe/Ti4',
    ownerEmail: 'riclara222@gmail.com',
    ownerPhone: '3017718888',
    state: 'AK',
    city: 'Enviado',
    zipCode: '00000',
    EIN: '111111111',
    Address: 'Cll 40aa Sur # 32 70, 306',
    AddressLineTwo: '',
    businessName: 'Test',
    businessType: 'Non-Profit',
    aba: 'uVOpJzWf/Dm5',
    dda: 'uFKpJjec+Dy/Foz/',
    ownerId: '59af4f5d5d31df6d2db0f265',
    seasons: ['Season A', 'Season B'],
    paymentId: 'acct_18OZ8zIhv1Yesxk9',
    referralCode: 'done',
    verify: 'pending',
    updateAt: '2017-09-06T01:28:13.367Z',
    createAt: '2017-09-06T01:28:13.367Z',
    website: 'https://www.getpaidup.com',
    averagePayment: '1',
    country: 'US'
  }
}

results.product.payload = {
  paymentId: 'acct_18OZ8zIhv1Yesxk9',
  season: 'test',
  organizationId: '57b6139811627b1d0ddbee30',
  organizationName: 'Cobras Volleyball Club',
  organizationLocation: 'San Antonio, TX',
  sku: 'TX - SAN ANTONIO - COBRAS VOLLEYBALL - 17 BLACK PREMIER 2016',
  name: '17 Black (Premier)',
  description: '17 Black (Premier)',
  location: 'San Antonio, TX',
  visibility: true,
  status: true,
  image: 'value image url',
  statementDescriptor: 'PaidUp Cobras 17 Black',
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
    cardFeeActual: 2.9,
    cardFeeDisplay: 2.9,
    cardFeeFlatActual: 0.3,
    cardFeeFlatDisplay: 0.3,
    achFeeActual: 0.8,
    achFeeDisplay: 2.3,
    achFeeFlatActual: 0,
    achFeeFlatDisplay: 0,
    achFeeCapActual: 0.25,
    achFeeCapDisplay: 5
  },
  collectionsFee: {
    fee: 3.5,
    feeFlat: 0
  },
  paysFees: {
    processing: true,
    collections: true
  }
}

results.plan.payload = {
  key: 'monthly',
  description: 'Monthly Payments',
  paymentMethods: ['card'],
  visible: true,
  dues: [
    {
      version: 'v2',
      description: 'Deposit',
      dateCharge: '2017-01-01 10:00',
      amount: 500.0,
      discount: 0,
      applyDiscount: false
    },
    {
      version: 'v2',
      description: 'Payment 1 of 5',
      dateCharge: '2017-09-01 10:00',
      amount: 500.0,
      discount: 0,
      applyDiscount: false
    },
    {
      version: 'v2',
      description: 'Payment 2 of 5',
      dateCharge: '2017-10-01 10:00',
      amount: 450.0,
      discount: 0,
      applyDiscount: false
    },
    {
      version: 'v2',
      description: 'Payment 3 of 5',
      dateCharge: '2017-11-01 10:00',
      amount: 400.0,
      discount: 0,
      applyDiscount: false
    },
    {
      version: 'v2',
      description: 'Payment 4 of 5',
      dateCharge: '2017-12-01 10:00',
      amount: 300.0,
      discount: 0,
      applyDiscount: false
    },
    {
      version: 'v2',
      description: 'Payment 5 of 5',
      dateCharge: '2017-01-01 10:00',
      amount: 100.0,
      discount: 0,
      applyDiscount: false
    }
  ]
}

chai.use(chaiHttp)

exports.chai = chai
exports.server = server
exports.should = should
exports.token = token
exports.results = results
