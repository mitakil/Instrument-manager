import { useEffect, useState } from 'react'

import { getCalibrations } from './calibrationService'
import { useCallback } from 'react'

export default function useCalibrations(id) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCalibrations = useCallback(async () => {
    try {
      setLoading(true)
      const items = await getCalibrations(id)
      setData(items)
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCalibrations()
  }, [fetchCalibrations])

  return { data, loading, error, refetch: fetchCalibrations }
}
