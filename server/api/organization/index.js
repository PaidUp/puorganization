import express from 'express'
import { Auth } from 'pu-common'
import { OrganizationController, ProductController, BeneficiaryController } from '@/controllers'

const router = express.Router()
router.put('/:organizationId', Auth.validate, OrganizationController.updateById)
router.get('/:organizationId', Auth.validate, OrganizationController.getById)

router.get('/:organizationId/products', Auth.validate, ProductController.getListByOrganizationId)
router.get('/:organizationId/product/:productId', Auth.validate, ProductController.getByOrganizationId)

router.get('/:organizationId/beneficiaries', Auth.validate, BeneficiaryController.getListByOrganizationId)
router.get('/:organizationId/beneficiary/:beneficiaryId', Auth.validate, BeneficiaryController.getByOrganizationId)

export default router
