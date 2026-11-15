import { Sequelize } from 'sequelize'
import { Instruments } from '../models/index.js'

async function pingService() {
  return {
    status: 'ok',
    message: 'Instrument service is reachable',
    utc: new Date(Date.now()),
  }
}

const nextCalibrationDuedate = Sequelize.literal(`(
  SELECT MAX(calibrations.due_date) FROM calibrations WHERE calibrations.instrument_id = "Instruments".id
  )`)

const lastActivity = Sequelize.literal(`(
  GREATEST(
  (SELECT MAX(comments.created_at) FROM comments WHERE comments.instrument_id = "Instruments".id), 
  (SELECT MAX(sub_comments.created_at) FROM sub_comments WHERE sub_comments.instrument_id = "Instruments".id))
  )`)

async function listAll() {
  return Instruments.findAll({
    attributes: {
      include: [
        [nextCalibrationDuedate, 'next_calib_due'],
        [lastActivity, 'last_activity'],
      ],
    },
    order: [[Sequelize.literal('last_activity'), 'DESC NULLS LAST']],
  })
}

async function getById(id) {
  return Instruments.findByPk(id)
}

async function postInstrument(data) {
  try {
    const instrument = await Instruments.create(data)

    return await Instruments.findByPk(instrument.id)
  } catch (error) {
    throw new Error(`Failed to create instrument: ${error.message}`)
  }
}

async function updateInstrument(id, data) {
  try {
    const instrument = await Instruments.findByPk(id)
    if (!instrument)
      throw Object.assign(new Error('Instrument not found'), { status: 404 })
    if (Object.keys(data).length === 0) return instrument
    return instrument.update(data)
  } catch (error) {
    throw new Error(`Failed to create instrument: ${error.message}`)
  }
}

export default {
  pingService,
  listAll,
  getById,
  postInstrument,
  updateInstrument,
}
