import express from 'express'
import { auth } from 'pu-common'
import { BeneficiaryController } from '@/controllers'

const router = express.Router()

router.post('/', auth.validate, BeneficiaryController.save)
router.post('/import', auth.validate, BeneficiaryController.import)
router.get('/:beneficiaryId', auth.validate, BeneficiaryController.getById)
router.put('/:beneficiaryId', auth.validate, BeneficiaryController.updateById)

export default router
