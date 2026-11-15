import { Router } from 'express'
const router = Router()

import calibrationController from '../controllers/calibrationController.js'
import { requireRole } from '../middleware/auth.js'
import { uploadCertificate } from '../middleware/uploadFile.js'

router.post(
  '/:id/calibrations',
  requireRole('engineer', 'admin'),
  uploadCertificate,
  calibrationController.postCalibration,
)

router.get('/:id/calibrations', calibrationController.getCalibration)

export default router
