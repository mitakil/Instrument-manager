import { useState } from 'react'
import { SquareArrowUpRight } from 'lucide-react'
import { formatDate } from '../../utils/formatDateTime'
import CalibrationDetailsModal from './CalibrationDetailsModal'

const tableGrid = 'grid grid-cols-7 gap-4 items-center'

export default function CalibrationHistoryTable({ items, pageLoading, pageError }) {
  const [selected, setSelected] = useState(null)

  let message = null
  if (pageLoading) message = 'Loading...'
  else if (pageError) message = 'Failed to load calibrations.'
  else if (items.length === 0) message = 'No calibrations'

  return (
    <div>
      <div
        className={`${tableGrid} sticky top-0 z-10 border-b border-gray-300 bg-white/80 px-6 py-2 text-xs text-gray-500 backdrop-blur`}
      >
        <div className="col-span-3">Calibration date</div>
        <div className="col-span-3">Done by</div>
        <div className="col-span-1">Details</div>
      </div>

      {message && (
        <p className={`px-6 py-2 text-xs ${pageError ? 'text-red-600' : 'text-gray-500'}`}>
          {message}
        </p>
      )}

      <div className="divide-y divide-gray-200 px-6">
        {items.map((it) => {
          return (
            <div key={it.id}>
              <div className={`${tableGrid} py-3 text-sm`}>
                <div className="col-span-3 truncate text-gray-600">
                  {formatDate(it.calibration_date) ?? '—'}
                </div>
                <div className="col-span-3 truncate text-gray-600">{it.performed_by ?? '—'}</div>
                <div className="col-span-1 truncate text-gray-600">
                  <button aria-label="open-calibration" onClick={() => setSelected(it)}>
                    {<SquareArrowUpRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {selected && <CalibrationDetailsModal onClose={() => setSelected(null)} item={selected} />}
    </div>
  )
}
