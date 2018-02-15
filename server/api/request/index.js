import express from 'express'
import { validate } from '@/util/auth'
import { RequestController } from '@/controllers'

const router = express.Router()
router.post('/', validate, RequestController.save)
router.put('/:id', validate, RequestController.updateById)
router.put('/:id/approve', validate, RequestController.approve)
router.get('/:id', validate, RequestController.getById)

export default router
