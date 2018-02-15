import express from 'express'
import { validate } from '@/util/auth'
import { PlanController } from '@/controllers'

const router = express.Router()

router.post('/', validate, PlanController.save)
router.get('/:planId', validate, PlanController.getById)
router.put('/:planId', validate, PlanController.updateById)

export default router
