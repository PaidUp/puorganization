process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let organizationResults = common.results.organization

it('POST# / it should create an organization', done => {
  chai
    .request(server)
    .post('/api/v1/organization')
    .set('authorization', token)
    .send(organizationResults.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('organizationId')
      res.body.organizationId.should.be.a('string')
      organizationResults.organizationId = res.body.organizationId
      done()
    })
})

it('GET# /:organizationId it should retrieve an organization', done => {
  chai
    .request(server)
    .get('/api/v1/organization/' + organizationResults.organizationId)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      organizationResults.document = res.body
      done()
    })
})

it('PUT# /:organizationId it should update an organization', done => {
  chai
    .request(server)
    .put('/api/v1/organization/' + organizationResults.organizationId)
    .set('authorization', token)
    .send({website: 'http://teamtest.com'})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('website')
      res.body.website.should.be.a('string')
      res.body.website.should.equal('http://teamtest.com')
      done()
    })
})