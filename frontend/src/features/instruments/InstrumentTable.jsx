import { useState } from 'react'
import { MessageSquare, MessageSquarePlus, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDateTime'

import CommentExpander from '../comments/CommentExpander'
import { statusStyles, qcStyles } from './constants'

const tableGrid = 'grid grid-cols-12 gap-4 items-center'

function StatusPill({ status, styles = statusStyles }) {
  const style = styles[status] ?? {
    label: status ?? 'Unknown',
    className: 'bg-gray-100 text-gray-700',
  }

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}
    >
      {style.label}
    </span>
  )
}

function CommentButton({ count, isOpen, onClick }) {
  const hasComments = count > 0
  const noun = count === 1 ? 'comment' : 'comments'
  const label = hasComments
    ? `${isOpen ? 'Hide' : 'Show'} ${count} ${noun}`
    : isOpen
      ? 'Hide comments'
      : 'Add a comment'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 ${
        hasComments ? 'text-gray-600' : 'text-gray-400'
      }`}
    >
      {hasComments ? (
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
      ) : (
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
      )}
      {hasComments && <span>{count}</span>}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default function InstrumentTable({ items, pageLoading, pageError }) {
  const [openId, setOpenId] = useState(null)
  const toggleRow = (id) => setOpenId((current) => (current === id ? null : id))

  let message = null
  if (pageLoading) message = 'Loading...'
  else if (pageError) message = 'Failed to load instruments.'
  else if (items.length === 0) message = 'No instruments found with filters.'

  return (
    <div>
      <div
        className={`${tableGrid} sticky top-0 z-10 border-b border-gray-300 bg-white/80 px-6 py-2 text-xs text-gray-500 backdrop-blur`}
      >
        <div className="col-span-3">Instrument</div>
        <div className="col-span-2">Group</div>
        <div className="col-span-2 text-center">QC</div>
        <div className="col-span-2 text-center">Calibration</div>
        <div className="col-span-2">Next calibration</div>
        <div className="col-span-1">
          <span className="sr-only">Comments</span>
        </div>
      </div>

      {message && (
        <p className={`px-6 py-2 text-xs ${pageError ? 'text-red-600' : 'text-gray-500'}`}>
          {message}
        </p>
      )}

      <div className="divide-y divide-gray-200 px-6">
        {items.map((it) => {
          const isOpen = openId === it.id

          return (
            <div key={it.id}>
              <div className={`${tableGrid} py-3 text-sm`}>
                <div className="col-span-3 min-w-0">
                  <Link
                    to={`/instrument/${it.id}`}
                    className="inline-block max-w-full truncate align-top font-medium text-gray-900 hover:text-primary hover:underline"
                  >
                    {it.name}
                  </Link>
                  <div className="truncate text-xs text-gray-400">{it.asset_id ?? '—'}</div>
                </div>

                <div className="col-span-2 truncate text-gray-600">{it.group ?? '—'}</div>

                <div className="col-span-2 text-center">
                  <StatusPill status={it.spc_status} styles={qcStyles} />
                </div>

                <div className="col-span-2 text-center">
                  <StatusPill status={it.calib_status} styles={statusStyles} />
                </div>

                <div
                  className="col-span-2 text-gray-600"
                  title={it.next_calib_due ? formatDate(it.next_calib_due) : 'No records'}
                >
                  {it.next_calib_due ? formatDate(it.next_calib_due) : '—'}
                </div>

                <div className="col-span-1 flex justify-end">
                  <CommentButton
                    count={it.commentCount ?? 0}
                    isOpen={isOpen}
                    onClick={() => toggleRow(it.id)}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="-mx-6 bg-gray-50 px-6 py-4">
                  <CommentExpander instrumentId={it.id} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
