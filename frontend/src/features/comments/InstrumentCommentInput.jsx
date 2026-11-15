import { useState } from 'react'

import { postComment } from './commentService'
import Button from '../../components/Button'

export default function InstrumentCommentInput({ instrumentId, onClose, onSuccess }) {
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!text.trim() || saving) return

    setSaving(true)
    setError(null)
    try {
      await postComment(instrumentId, text.trim())
      onSuccess()
    } catch (error) {
      setError('Failed to post comment: ', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
        rows={3}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <div className="mt-2 flex gap-2">
          <Button variant="primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}
