import express from 'express'
import organization from './organization'
import product from './product'
import plan from './plan'
import request from './request'
const router = express.Router()

router.use('/', organization)
router.use('/product', product)
router.use('/plan', plan)
router.use('/request', request)

export default router
