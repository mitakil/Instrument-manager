import { CornerDownRight } from 'lucide-react'
import { useState } from 'react'
import useSubComments from './useSubComments'
import SubCommentRow from './SubCommentRow'
import { formatDate, formatDateTime } from '../../utils/formatDateTime'
import Button from '../../components/Button'
import { ReplyForm } from './ReplyForm'

export function Avatar({ user }) {
  const initials = `${user?.first_name?.[0] ?? ''}${user?.last_name?.[0] ?? ''}`

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-primary"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function CommentMeta({ user, createdAt, onReply, onCancel, isReplying }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-sm font-medium text-gray-900" title={user?.role}>
        {user?.first_name} {user?.last_name}
      </span>
      <span className="text-xs text-gray-400" title={formatDateTime(createdAt)}>
        {formatDate(createdAt)}
      </span>
      {!isReplying && onReply && (
        <Button variant="ghost" className="ml-auto" onClick={isReplying ? onCancel : onReply}>
          Reply
        </Button>
      )}
    </div>
  )
}

export default function InstrumentCommentRow({ item, isReplying, onReply, onCancel }) {
  const [showReplies, setShowReplies] = useState(false)
  const { data, loading, error, refetch } = useSubComments(showReplies ? item.id : null)
  const replyCount = item.subCommentCount
  const canHaveReplies = replyCount === undefined || replyCount > 0 || showReplies

  let toggleLabel = 'Show replies'
  if (showReplies) toggleLabel = 'Hide replies'
  else if (replyCount) toggleLabel = `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`

  const handleSuccess = () => {
    refetch()
    setShowReplies(true)
    onCancel()
  }

  return (
    <div className="flex gap-3">
      <Avatar user={item.User} />

      <div className="min-w-0 flex-1">
        <CommentMeta
          user={item.User}
          createdAt={item.createdAt}
          onReply={onReply}
          isReplying={isReplying}
          onCancel={onCancel}
        />
        <p className="mt-0.5 text-sm text-gray-800">{item.content}</p>

        {canHaveReplies && (
          <button
            type="button"
            onClick={() => setShowReplies((value) => !value)}
            aria-expanded={showReplies}
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800"
          >
            <CornerDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            {toggleLabel}
          </button>
        )}

        {isReplying && (
          <ReplyForm commentId={item.id} onCancel={onCancel} onSuccess={handleSuccess} />
        )}

        {showReplies && (
          <div className="mt-3 space-y-3 border-l-2 border-gray-200 pl-3">
            {loading && <p className="text-xs text-gray-500">Loading replies...</p>}
            {error && <p className="text-xs text-red-600">Could not load replies</p>}
            {!loading && !error && data.length === 0 && (
              <p className="text-xs text-gray-500">No replies yet.</p>
            )}
            {data.map((reply) => (
              <SubCommentRow key={reply.id} item={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
