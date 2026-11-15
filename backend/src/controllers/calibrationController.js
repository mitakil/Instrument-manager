import calibrationService from '../services/calibrationService.js'
import logger from '../../utils/logger.js'
import fs from 'node:fs/promises'

async function postCalibration(req, res) {
  const { calibration_date, performed_by, comment } = req.body
  const data = {
    instrument_id: Number(req.params.id),
    calibration_date,
    performed_by,
    comment,
    certificate_stored_name: req.file?.filename ?? null,
    certificate_original_name: req.file?.originalname ?? null,
    certificate_size: req.file?.size ?? null,
    created_by: req.user.id,
  }
  try {
    const calibration = await calibrationService.postCalibration(data)
    res.status(201).json(calibration)
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path).catch(() => {})
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

async function getCalibration(req, res) {
  try {
    const result = await calibrationService.getCalibration(req.params.id)
    res.json(result)
  } catch (error) {
    logger.error('Something went wrong on getCalinration', error)
  }
}

export default {
  postCalibration,
  getCalibration,
}
