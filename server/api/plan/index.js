import express from 'express'
import { auth } from 'pu-common'
import { PlanController } from '@/controllers'

const router = express.Router()

router.post('/', auth.validate, PlanController.save)
router.get('/all', auth.validate, PlanController.getAll)
router.get('/:planId', auth.validate, PlanController.getById)
router.get('/:planId/join', auth.validate, PlanController.join)
router.put('/:planId', auth.validate, PlanController.updateById)

export default router
