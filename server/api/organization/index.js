import express from 'express'
import { auth } from 'pu-common'
import { OrganizationController, ProductController, BeneficiaryController } from '@/controllers'

const router = express.Router()
router.put('/:organizationId', auth.validate, OrganizationController.updateById)
router.get('/:organizationId', auth.validate, OrganizationController.getById)

router.get('/:organizationId/products', auth.validate, ProductController.getListByOrganizationId)
router.get('/:organizationId/product/:productId', auth.validate, ProductController.getByOrganizationId)

router.get('/:organizationId/beneficiaries', auth.validate, BeneficiaryController.getListByOrganizationId)
router.get('/:organizationId/beneficiary/:beneficiaryId', auth.validate, BeneficiaryController.getByOrganizationId)

export default router
