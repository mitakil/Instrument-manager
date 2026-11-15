import { Router } from 'express'
const router = Router()

import instrumentController from '../controllers/instrumentController.js'
import { requireRole } from '../middleware/auth.js'

router.get('/ping', instrumentController.ping)
router.get('/', instrumentController.getInstruments)
router.get('/:id', instrumentController.getInstrument)

router.post(
  '/',
  requireRole('engineer', 'admin'),
  instrumentController.postInstrument,
)

router.patch(
  '/:id',
  requireRole('engineer', 'admin'),
  instrumentController.patchInstrument,
)

export default router
