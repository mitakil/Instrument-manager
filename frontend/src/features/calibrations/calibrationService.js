import api from '../../services/api'

export function postCalibration(instrumentId, { dateDone, performedBy, comment, file }) {
  const formData = new FormData()
  formData.append('calibration_date', dateDone)
  formData.append('performed_by', performedBy)
  formData.append('comment', comment)
  formData.append('certificate', file)

  return api.post(`/instruments/${instrumentId}/calibrations`, formData).then((res) => res.data)
}

export function getCalibrations(id) {
  return api.get(`/instruments/${id}/calibrations`).then((res) => res.data)
}
