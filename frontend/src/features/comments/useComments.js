import { useEffect, useState, useCallback } from 'react'

import { getComment } from './commentService'

export default function useComments(instrumentId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true)
      const items = await getComment(instrumentId)
      setData(items)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [instrumentId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return { data, loading, error, refetch: fetchComments }
}
