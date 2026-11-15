import { useCallback, useEffect, useState } from 'react'

import instrumentService from './instrumentsService'

export default function useInstruments(id) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchInstrument = useCallback(async () => {
    try {
      setLoading(true)
      const items = await instrumentService.getOne(id)
      setData(items)
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchInstrument()
  }, [fetchInstrument])

  return { data, loading, error, refetch: fetchInstrument }
}
