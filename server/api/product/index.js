import express from 'express'
import { Auth } from 'pu-common'
import { ProductController, PlanController } from '@/controllers'

const router = express.Router()

router.post('/', Auth.validate, ProductController.save)
router.get('/:productId', Auth.validate, ProductController.getById)
router.put('/:productId', Auth.validate, ProductController.updateById)

router.get('/:productId/plans', Auth.validate, PlanController.getListByProductId)
router.get('/:productId/plan/:planId', Auth.validate, PlanController.getByProductId)

export default router
