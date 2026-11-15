import { useEffect, useState } from 'react'

import instrumentService from './instrumentsService'
import { useCallback } from 'react'

export default function useInstruments() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchInstruments = useCallback(async () => {
    try {
      setLoading(true)
      const items = await instrumentService.getAll()
      setData(items)
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInstruments()
  }, [fetchInstruments])

  return { data, loading, error, refetch: fetchInstruments }
}
