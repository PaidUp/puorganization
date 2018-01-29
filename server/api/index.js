import express from 'express'
import organization from './organization'
import product from './product'
import plan from './plan'
const router = express.Router()

router.use('/organization', organization)
router.use('/product', product)
router.use('/plan', plan)

export default router
