import express from 'express'
import { isAuthenticated } from '@/util'
import { OrganizationController, ProductController } from '@/controllers'

const router = express.Router()
router.post('/', isAuthenticated, OrganizationController.save)
router.put('/:organizationId', isAuthenticated, OrganizationController.updateById)
router.put('/:organizationId/payment/:paymentId', isAuthenticated, OrganizationController.updatePaymentId)
router.get('/:organizationId', isAuthenticated, OrganizationController.getById)

router.get('/:organizationId/products', isAuthenticated, ProductController.getListByOrganizationId)
router.get('/:organizationId/product/:productId', isAuthenticated, ProductController.getByOrganizationId)

export default router
