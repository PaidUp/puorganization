import express from 'express'
import { validate } from '@/util/auth'
import { ProductController, PlanController } from '@/controllers'

const router = express.Router()

router.post('/', validate, ProductController.save)
router.get('/:productId', validate, ProductController.getById)
router.put('/:productId', validate, ProductController.updateById)

router.get('/:productId/plans', validate, PlanController.getListByProductId)
router.get('/:productId/plan/:planId', validate, PlanController.getByProductId)

export default router
