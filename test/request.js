process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let requestResults = common.results.request

it('POST# / it should create an requst', done => {
  chai
    .request(server)
    .post('/api/v1/organization/request')
    .set('authorization', token())
    .send(requestResults.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      requestResults._id = res.body._id
      done()
    })
})

it('GET# /:id it should retrieve an organization', done => {
  chai
    .request(server)
    .get('/api/v1/organization/request/' + requestResults._id)
    .set('authorization', token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      requestResults.document = res.body
      done()
    })
})

it('PUT# /:id it should update an organization', done => {
  chai
    .request(server)
    .put('/api/v1/organization/request/' + requestResults._id)
    .set('authorization', token())
    .send({businessUrl: 'http://teamtest.com'})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('businessUrl')
      res.body.businessUrl.should.be.a('string')
      res.body.businessUrl.should.equal('http://teamtest.com')
      done()
    })
})

it('PUT# /:id/approve it should update an organization', done => {
  chai
    .request(server)
    .put('/api/v1/organization/request/' + requestResults._id +'/approve') //  + requestResults._id)
    .set('authorization', token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('status')
      res.body.status.should.be.a('string')
      res.body.status.should.equal('approved')
      res.body.should.have.property('organizationId')
      res.body.organizationId.should.be.a('string')
      requestResults.document = res.body
      done()
    })
})
