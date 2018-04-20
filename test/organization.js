process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let results = common.results

it('GET# / it should retrieve all organizations', done => {
  chai
    .request(server)
    .get('/api/v1/organization')
    .set('authorization', token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.to.be.an('array')
      done()
    })
})

it('GET# /:organizationId it should retrieve an organization', done => {
  chai
    .request(server)
    .get('/api/v1/organization/' + results.request.document.organizationId)
    .set('authorization', token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('_id')
      res.body._id.should.be.a('string')
      res.body._id.should.equal(results.request.document.organizationId)
      results.organization.document = res.body
      done()
    })
})

it('PUT# /:organizationId it should update an organization', done => {
  chai
    .request(server)
    .put('/api/v1/organization/' + results.organization.document._id)
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

it('POST# /upload/logo it should upload image to s3', done => {
  chai
    .request(server)
    .post('/api/v1/organization/upload/logo')
    .set('authorization', token())
    .set('Content-Type', 'multipart/form-data')
    .attach('logo', 'test/media/test.jpg')
    .end(function(err, res){
      res.should.have.status(200)
      res.body.should.have.property('key')
      res.body.key.should.be.a('string')
      res.body.key.should.equal('organization/logo/test.jpg')
      done()
    })
})

it('PUT# /upload/logo it should upload an image and update image attribute into organization doc', done => {
  chai
    .request(server)
    .put('/api/v1/organization/upload/logo')
    .set('authorization', token())
    .set('Content-Type', 'multipart/form-data')
    .field('organizationId', results.organization.document._id)
    .attach('logo', 'test/media/test.jpg')
    .end(function(err, res){
      res.should.have.status(200)
      res.body.should.have.property('image')
      res.body.image.should.be.a('string')
      res.body.image.should.equal('organization/logo/test.jpg')
      done()
    })
})