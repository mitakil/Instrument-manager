import { Calibrations, Instruments } from '../models/index.js'

async function postCalibration(data) {
  // For next calibration date fetch calib frequency from instruments table
  const instrument = await Instruments.findByPk(data.instrument_id)
  if (!instrument) throw new Error(`Instrument not found`, { status: 404 })

  const dueDate = new Date(data.calibration_date)
  dueDate.setMonth(dueDate.getMonth() + instrument.calibration_frequency)
  const calibration = await Calibrations.create({
    ...data,
    due_date: dueDate,
  })

  return calibration
}

async function getCalibration(id) {
  return Calibrations.findAll({
    where: { instrument_id: id },
  })
}

export default {
  postCalibration,
  getCalibration,
}
