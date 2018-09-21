import express from 'express'
import { auth } from 'pu-common'
import { ProductController, PlanController } from '@/controllers'

const router = express.Router()

router.post('/', auth.validate, ProductController.save)
router.get('/all', auth.validate, ProductController.getAll)
router.get('/:productId', auth.validate, ProductController.getById)
router.put('/:productId', auth.validate, ProductController.updateById)

router.get('/:productId/plans', auth.validate, PlanController.getListByProductId)
router.get('/:productId/plan/:planId', auth.validate, PlanController.getByProductId)

export default router
