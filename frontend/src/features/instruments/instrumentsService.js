import api from '../../services/api'

const getAll = async () => {
  const res = await api.get(`/instruments`)
  return res.data
}

const getOne = async (id) => {
  const res = await api.get(`/instruments/${id}`)
  return res.data
}

export function postInstrument(data) {
  return api.post(`/instruments`, data).then((res) => res.data)
}

export function patchInstrument(id, data) {
  return api.patch(`/instruments/${id}`, data).then((res) => res.data)
}

export default { getAll, getOne }
