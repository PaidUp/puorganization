import express from 'express'
import { validate } from '@/util/auth'
import { OrganizationController, ProductController, BeneficiaryController } from '@/controllers'

const router = express.Router()
router.put('/:organizationId', validate, OrganizationController.updateById)
router.get('/:organizationId', validate, OrganizationController.getById)

router.get('/:organizationId/products', validate, ProductController.getListByOrganizationId)
router.get('/:organizationId/product/:productId', validate, ProductController.getByOrganizationId)

router.get('/:organizationId/beneficiaries', validate, BeneficiaryController.getListByOrganizationId)
router.get('/:organizationId/beneficiary/:beneficiaryId', validate, BeneficiaryController.getByOrganizationId)

export default router
