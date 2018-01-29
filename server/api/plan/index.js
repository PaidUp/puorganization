import express from 'express'
import { isAuthenticated } from '@/util'
import { PlanController } from '@/controllers'

const router = express.Router()

router.post('/', isAuthenticated, PlanController.save)
router.get('/:planId', isAuthenticated, PlanController.getById)
router.put('/:planId', isAuthenticated, PlanController.updateById)

export default router
