process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let results = common.results

it('POST# / it should create a beneficiary', done => {
  results.beneficiary.payload.organizationId = results.organization.document._id
  chai
    .request(server)
    .post('/api/v1/organization/beneficiary')
    .set('authorization', token)
    .send(results.beneficiary.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body.organizationId.should.be.a('string')
      results.beneficiary.beneficiaryId = res.body._id
      done()
    })
})

it('GET# /:beneficiaryId it should retrieve a beneficiary', done => {
  chai
    .request(server)
    .get('/api/v1/organization/beneficiary/' + results.beneficiary.beneficiaryId)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      res.body._id.should.equal(results.beneficiary.beneficiaryId)
      results.beneficiary.document = res.body
      done()
    })
})

it('PUT# /:beneficiaryId it should update a beneficiary', done => {
  chai
    .request(server)
    .put('/api/v1/organization/beneficiary/'+ results.beneficiary.beneficiaryId)
    .set('authorization', token)
    .send({description: 'is a great boy'})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('description')
      res.body.description.should.be.a('string')
      res.body.description.should.equal('is a great boy')
      done()
    })
})

it('GET# /:organizationId/beneficiaries it should retrieve beneficiaries list by organization', done => {
  chai
    .request(server)
    .get(`/api/v1/organization/${results.organization.document._id}/beneficiaries`)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.to.be.an('array')
      results.beneficiary.documents = res.body
      done()
    })
})

it('GET# /organization/:organizationId/beneficiary/:beneficiaryId it should retrieve a beneficiary by organization', done => {
  chai
    .request(server)
    .get(`/api/v1/organization/${results.organization.document._id}/beneficiary/${results.beneficiary.beneficiaryId}`)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body.organizationId.should.be.a('string')
      res.body._id.should.equal(results.beneficiary.beneficiaryId)
      results.beneficiary.documents = res.body
      done()
    })
})

it('POST# / it should import beneficiaries', done => {
  for (let beneficiary of results.beneficiary.imports) {
    beneficiary.organizationId = results.organization.document._id
  }
  chai
    .request(server)
    .post('/api/v1/organization/beneficiary/import')
    .set('x-api-key', 'JF06f7FJjTDkNOcM1sdywWw5CZBHW4Jy')
    .send(results.beneficiary.imports)
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
})
