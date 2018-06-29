import express from 'express'
import { auth } from 'pu-common'
import { BeneficiaryController } from '@/controllers'
import multer from 'multer'
import multerS3 from 'multer-s3'
import connect from 'connect'
import { S3 } from 'aws-sdk'
import config from '@/config/environment'

let s3 = new S3()
// let upload1 = multer({ dest: 'uploads/' })

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3.bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      const id = req.params.id
      cb(null, 'beneficiary/avatar/' + id + '.png')
    }
  })
})

let combinedMiddleware = (function () {
  var chain = connect();
  [auth.validate, upload.single('avatar')].forEach(function (middleware) {
    chain.use(middleware)
  })
  return chain
})()

const router = express.Router()
router.post('/', auth.validate, BeneficiaryController.save)
router.post('/avatar/:id', combinedMiddleware, BeneficiaryController.avatar)
router.post('/import', auth.validate, BeneficiaryController.import)
router.get('/:beneficiaryId', auth.validate, BeneficiaryController.getById)
router.get('/assignee/:assigneeEmail', auth.validate, BeneficiaryController.getByassigneesEmail)
router.put('/:beneficiaryId', auth.validate, BeneficiaryController.updateById)
router.delete('/:beneficiaryId', auth.validate, BeneficiaryController.delete)

export default router
