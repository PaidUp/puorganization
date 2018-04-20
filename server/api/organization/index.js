import express from 'express'
import { auth, S3, combinedMiddleware } from 'pu-common'
import { OrganizationController, ProductController, BeneficiaryController } from '@/controllers'
import config from '@/config/environment'

const s3 = new S3(config.s3.organization.logo)

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
