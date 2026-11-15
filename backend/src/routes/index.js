import { Router } from 'express'
import loginRouter from './loginRouter.js'
import instrumentRoute from './instrumentRoute.js'
import userRoute from './userRoute.js'
import commentRoute from './commentRoute.js'
import calibrationRoute from './calibrationRoute.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use('/login', loginRouter)
router.use(requireAuth)

router.use('/instruments', instrumentRoute)
router.use('/users', userRoute)
router.use('/comments', commentRoute)
router.use('/instruments', calibrationRoute)

export default router
