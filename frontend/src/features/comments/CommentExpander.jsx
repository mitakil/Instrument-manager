import { useState } from 'react'
import useComments from './useComments'
import InstrumentCommentRow from './InstrumentCommentRow'
import InstrumentCommentInput from './InstrumentCommentInput'
import Button from '../../components/Button'

export default function CommentExpander({ instrumentId }) {
  const { data, loading, error, refetch } = useComments(instrumentId)
  const [showInput, setShowInput] = useState(false)

  const [replyingTo, setReplyingTo] = useState(null)

  const handleSuccess = () => {
    setShowInput(false)
    refetch()
  }

  if (loading) return <p className="text-sm text-gray-500">Loading comments…</p>
  if (error) return <p className="text-sm text-red-600">Could not load comments.</p>

  return (
    <div className="pl-4 text-sm text-gray-700">
      <div className="mb-4">
        {showInput ? (
          <InstrumentCommentInput
            instrumentId={instrumentId}
            onClose={() => setShowInput(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <div className="mt-2 flex gap-2">
            <Button variant="primary" onClick={() => setShowInput(true)}>
              Add comment
            </Button>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {data.map((comment) => (
            <InstrumentCommentRow
              key={comment.id}
              item={comment}
              isReplying={replyingTo === comment.id}
              onReply={() => setReplyingTo(comment.id)}
              onCancel={() => setReplyingTo(null)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
