import { Search } from 'lucide-react'

import PillInput from '../../components/PillInput'
import { statusStyles, qcStyles } from './constants'

const emptyFilters = { text: '', group: '', status: '', qcStatus: '' }

const selectClass =
  'h-10 rounded-md border border-gray-300 bg-white px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60'

export default function InstrumentToolBar({ value, onChange, groups }) {
  const hasFilters = Object.values(value).some(Boolean)

  const update = (key) => (e) => onChange({ ...value, [key]: e.target.value })

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <PillInput
        label="Search instruments"
        placeholder="Search name or serial"
        icon={<Search className="h-4 w-4" />}
        value={value.text}
        onChange={update('text')}
        width="w-full sm:w-auto sm:flex-1"
      />

      <select
        value={value.group}
        onChange={update('group')}
        aria-label="Filter by group"
        className={selectClass}
      >
        <option value="">Group: all</option>
        {groups.map((group) => (
          <option key={group} value={group}>
            Group: {group}
          </option>
        ))}
      </select>

      <select
        value={value.qcStatus}
        onChange={update('qcStatus')}
        aria-label="Filter by QC status"
        className={selectClass}
      >
        <option value="">QC: all</option>
        {Object.entries(qcStyles).map(([key, { label }]) => (
          <option key={key} value={key}>
            QC: {label}
          </option>
        ))}
      </select>

      <select
        value={value.status}
        onChange={update('status')}
        aria-label="Filter by status"
        className={selectClass}
      >
        <option value="">Calibration: all</option>
        {Object.entries(statusStyles).map(([key, { label }]) => (
          <option key={key} value={key}>
            Calibration: {label}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={() => onChange(emptyFilters)}
          className="px-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
