import express from 'express'
import { auth, S3, combinedMiddleware } from 'pu-common'
import { OrganizationController, ProductController, BeneficiaryController } from '@/controllers'

const s3 = new S3({
  bucket: 'pu-organizaton-logo-dev',
  directory: 'logo',
  setOriginalName: true,
  isPublic: true
})

const cm = combinedMiddleware([auth.validate, s3.upload.array('logo')])

const router = express.Router()
router.put('/:organizationId', auth.validate, OrganizationController.updateById)
router.get('/:organizationId', auth.validate, OrganizationController.getById)
router.get('/', auth.validate, OrganizationController.getAll)

router.get('/:organizationId/products', auth.validate, ProductController.getListByOrganizationId)
router.get('/:organizationId/product/:productId', auth.validate, ProductController.getByOrganizationId)

router.get('/:organizationId/beneficiaries', auth.validate, BeneficiaryController.getListByOrganizationId)
router.get('/:organizationId/beneficiary/:beneficiaryId', auth.validate, BeneficiaryController.getByOrganizationId)

router.post('/upload/logo', cm, OrganizationController.uploadLogo)
router.put('/upload/logo', cm, OrganizationController.updateLogo)

export default router
