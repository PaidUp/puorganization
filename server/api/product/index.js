import express from 'express'
import { isAuthenticated } from '@/util'
import { ProductController, PlanController } from '@/controllers'

const router = express.Router()

router.post('/', isAuthenticated, ProductController.save)
router.get('/:productId', isAuthenticated, ProductController.getById)
router.put('/:productId', isAuthenticated, ProductController.updateById)

router.get('/:productId/plans', isAuthenticated, PlanController.getListByProductId)
router.get('/:productId/plan/:planId', isAuthenticated, PlanController.getByProductId)

export default router
