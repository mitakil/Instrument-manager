import { Avatar, CommentMeta } from './InstrumentCommentRow'

export default function SubCommentRow({ item }) {
  return (
    <div className="flex gap-3">
      <Avatar user={item.User} />
      <div className="min-w-0 flex-1">
        <CommentMeta user={item.User} createdAt={item.createdAt} />
        <p className="mt-0.5 text-sm text-gray-800">{item.content}</p>
      </div>
    </div>
  )
}
