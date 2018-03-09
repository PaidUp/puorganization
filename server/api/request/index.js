import express from 'express'
import { auth } from 'pu-common'
import { RequestController } from '@/controllers'

const router = express.Router()
router.post('/', auth.validate, RequestController.save)
router.put('/:id', auth.validate, RequestController.updateById)
router.put('/:id/approve', auth.validate, RequestController.approve)
router.get('/:id', auth.validate, RequestController.getById)

export default router
