import instrumentService from '../services/instrumentService.js'
import logger from '../../utils/logger.js'

async function ping(_req, res, next) {
  try {
    const response = await instrumentService.pingService()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

async function getInstruments(req, res) {
  try {
    const result = await instrumentService.listAll()
    res.json(result)
  } catch (error) {
    logger.error('Something wrong on getInstruments', error)
  }
}

async function getInstrument(req, res) {
  const result = await instrumentService.getById(req.params.id)
  res.json(result)
}

async function postInstrument(req, res) {
  const allowed_fields = [
    'name',
    'serial',
    'group',
    'asset_id',
    'instrument_location',
    'manufacturer',
    'model',
    'software',
    'software_version',
    'calibration_frequency',
    'instrument_status',
  ]

  const data = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowed_fields.includes(key)),
  )

  try {
    const instrument = await instrumentService.postInstrument(data)
    res.status(201).json(instrument)
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

async function patchInstrument(req, res) {
  const allowed_fields = [
    'name',
    'serial',
    'group',
    'asset_id',
    'instrument_location',
    'manufacturer',
    'model',
    'software',
    'software_version',
    'calibration_frequency',
    'instrument_status',
  ]

  const data = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowed_fields.includes(key)),
  )
  try {
    const instrument = await instrumentService.updateInstrument(
      Number(req.params.id),
      data,
    )
    res.status(201).json(instrument)
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

export default {
  ping,
  getInstruments,
  getInstrument,
  postInstrument,
  patchInstrument,
}
