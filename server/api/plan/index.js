import express from 'express'
import { Auth } from 'pu-common'
import { PlanController } from '@/controllers'

const router = express.Router()

router.post('/', Auth.validate, PlanController.save)
router.get('/:planId', Auth.validate, PlanController.getById)
router.get('/:planId/join', Auth.validate, PlanController.join)
router.put('/:planId', Auth.validate, PlanController.updateById)

export default router
