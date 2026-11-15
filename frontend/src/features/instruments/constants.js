export const statusStyles = {
  OK: {
    label: 'OK',
    className: 'bg-green-50 text-green-800',
    dot: 'bg-green-500',
    active: 'border-green-600 bg-green-50',
  },
  Due: {
    label: 'Due soon',
    className: 'bg-amber-50 text-amber-800',
    dot: 'bg-amber-500',
    active: 'border-amber-600 bg-amber-50',
  },
  NOK: {
    label: 'Overdue',
    className: 'bg-red-50 text-red-800',
    dot: 'bg-red-500',
    active: 'border-red-600 bg-red-50',
  },
}

export const qcStyles = {
  OK: {
    label: 'In control',
    className: 'bg-green-50 text-green-800',
    dot: 'bg-green-500',
    active: 'border-green-600 bg-green-50',
  },
  NOK: {
    label: 'Out of control',
    className: 'bg-red-50 text-red-800',
    dot: 'bg-red-500',
    active: 'border-red-600 bg-red-50',
  },
}

export const quickFilters = [
  {
    key: 'cal-overdue',
    label: 'Calibration overdue',
    field: 'status',
    dataField: 'calib_status',
    value: 'NOK',
    tone: 'danger',
  },
  {
    key: 'cal-due',
    label: 'Calibration due soon',
    field: 'status',
    dataField: 'calib_status',
    value: 'Due',
    tone: 'warning',
  },
  {
    key: 'qc-out',
    label: 'QC out of control',
    field: 'qcStatus',
    dataField: 'spc_status',
    value: 'NOK',
    tone: 'danger',
  },
]

export const calibrationFrequencies = [
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 12, label: '12 months' },
]
