import { Router } from 'express'

const router = Router()

import userController from '../controllers/userController.js'
import { requireRole } from '../middleware/auth.js'

router.get('/ping', userController.ping)

router.get('/', userController.getUsers)

router.post('/adduser', requireRole('admin'), userController.postUser)

export default router
