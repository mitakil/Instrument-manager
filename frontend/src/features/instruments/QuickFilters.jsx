import { CalendarX, CalendarClock, Activity } from 'lucide-react'
import { quickFilters } from './constants'

const icons = { 'cal-overdue': CalendarX, 'cal-due': CalendarClock, 'qc-out': Activity }

const tones = {
  danger: { icon: 'bg-red-50 text-red-700', active: 'border-red-600 bg-red-50' },
  warning: { icon: 'bg-amber-50 text-amber-700', active: 'border-amber-600 bg-amber-50' },
}

export default function QuickFilters({ items, value, onChange }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Needs attention">
      {quickFilters.map((f) => {
        const count = items.filter((i) => i[f.dataField] === f.value).length
        const active = value[f.field] === f.value
        const Icon = icons[f.key]
        const tone = tones[f.tone]

        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange({ ...value, [f.field]: active ? '' : f.value })}
            className={`flex min-w-40 flex-1 items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
              active ? tone.active : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${active ? 'bg-white' : tone.icon}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xl font-medium leading-none text-gray-900">{count}</span>
              <span className="block text-xs text-gray-500">{f.label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
