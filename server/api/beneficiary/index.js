import express from 'express'
import { validate } from '@/util/auth'
import { BeneficiaryController } from '@/controllers'

const router = express.Router()

router.post('/', validate, BeneficiaryController.save)
router.get('/:beneficiaryId', validate, BeneficiaryController.getById)
router.put('/:beneficiaryId', validate, BeneficiaryController.updateById)

export default router
