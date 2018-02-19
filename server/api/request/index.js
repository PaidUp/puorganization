import express from 'express'
import { Auth } from 'pu-common'
import { RequestController } from '@/controllers'

const router = express.Router()
router.post('/', Auth.validate, RequestController.save)
router.put('/:id', Auth.validate, RequestController.updateById)
router.put('/:id/approve', Auth.validate, RequestController.approve)
router.get('/:id', Auth.validate, RequestController.getById)

export default router
