import express from 'express'
import organization from './organization'
import product from './product'
import plan from './plan'
import request from './request'
import beneficiary from './beneficiary'
const router = express.Router()

router.use('/', organization)
router.use('/product', product)
router.use('/plan', plan)
router.use('/request', request)
router.use('/beneficiary', beneficiary)

export default router
