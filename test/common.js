let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
let should = chai.should()
let config = require('../server/config/environment').default
let token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3RzIjpbXSwicm9sZXMiOlsicGFyZW50Il0sIl9pZCI6IjVhODMyMTlkMTc1Zjk1MGU3NjlkYmViMyIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ0eXBlIjoiY3VzdG9tZXIiLCJzYWx0IjoienhvYU1LbjY1TzIwWE1LY0x3aU0yQT09IiwiaGFzaGVkUGFzc3dvcmQiOiJKWWJaNU5wbnJqZTFEaUdMcmhrUm9DTDM4cW5RTVFOKzZRWTJka0pnNy9QMlBVeWZIRkozbllMdlZ5QjhiYXNqb3N2T2pseU9xNlB5WlFIZHU4cVQ5QT09IiwiX192IjowfSwiaWF0IjoxNTE4NTQzMjg3LCJleHAiOjM0MTA3MDMyODd9.pRQNdpZMVh0GRVGyj8Yxh2d_bhwi66hKj49iGChmIuE'
let results = {
  organization: {},
  product: {},
  plan: {},
  request: {},
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
    accountNumber: '000123456789',    
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
  collectionFees: {
    fee: 3.5,
    feeFlat: 0
  },
  payFees: {
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
