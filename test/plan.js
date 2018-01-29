process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let results = common.results

it('POST# / it should create a plan', done => {
  results.plan.payload.productId = results.product.productId
  chai
    .request(server)
    .post('/api/v1/plan')
    .set('authorization', token)
    .send(results.plan.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body.productId.should.be.a('string')
      results.plan.planId = res.body._id
      done()
    })
})

it('GET# /:planId it should retrieve a plan', done => {
  chai
    .request(server)
    .get('/api/v1/plan/' + results.plan.planId)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      res.body._id.should.equal(results.plan.planId)
      results.plan.document = res.body
      done()
    })
})

it('GET# /product/:productId/plans it should retrieve an plan list by product', done => {
  chai
    .request(server)
    .get('/api/v1/product/' + results.product.productId + '/plans')
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.to.be.an('array').that.include(results.plan.document)
      results.plan.documents = res.body
      done()
    })
})

it('GET# /product/:productId/plan/:planId it should retrieve a plan by product', done => {
  chai
    .request(server)
    .get('/api/v1/product/' + results.product.productId + '/plan/' + results.plan.planId)
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body.productId.should.be.a('string')
      res.body._id.should.equal(results.plan.planId)
      results.plan.document = res.body
      done()
    })
})

it('PUT# /:planId it should update a plan', done => {
  chai
    .request(server)
    .put('/api/v1/plan/'+ results.plan.planId)
    .set('authorization', token)
    .send({description: 'Monthly plans updated'})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('description')
      res.body.description.should.be.a('string')
      res.body.description.should.equal('Monthly plans updated')
      done()
    })
})
