import { Router } from 'express'
const router = Router()

import loginController from '../controllers/loginController.js'

router.post('/', loginController.login)

export default router
