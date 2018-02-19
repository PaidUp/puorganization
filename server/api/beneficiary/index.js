import express from 'express'
import { Auth } from 'pu-common'
import { BeneficiaryController } from '@/controllers'

const router = express.Router()

router.post('/', Auth.validate, BeneficiaryController.save)
router.get('/:beneficiaryId', Auth.validate, BeneficiaryController.getById)
router.put('/:beneficiaryId', Auth.validate, BeneficiaryController.updateById)

export default router
