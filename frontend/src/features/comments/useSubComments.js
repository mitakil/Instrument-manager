import { useEffect, useState, useCallback } from 'react'

import { getSubComments } from './commentService'

export default function useSubComments(commentId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubComments = useCallback(async () => {
    if (commentId === null) {
      setData([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const items = await getSubComments(commentId)
      setData(items)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [commentId])

  useEffect(() => {
    fetchSubComments()
  }, [fetchSubComments])

  return { data, loading, error, refetch: fetchSubComments }
}
