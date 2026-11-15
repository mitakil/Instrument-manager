import { formatDate } from '../../utils/formatDateTime'
import { FileText } from 'lucide-react'

const calibrationFields = [
  { key: 'calibration_date', label: 'Calibration date', format: formatDate },
  { key: 'due_date', label: 'Next calibration', format: formatDate },
  { key: 'performed_by', label: 'Performed by' },
]

const labelClass = 'text-sm text-gray-400'

function DetailList({ fields, data }) {
  return (
    <dl className="grid grid-cols-4 gap-y-2 text-sm">
      {fields.map(({ key, label, format }) => (
        <div key={key}>
          <dt className={labelClass}>{label}</dt>
          <dd>{data[key] === null ? '—' : format ? format(data[key]) : data[key]}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function CalibrationDetails({ data }) {
  return (
    <div className=" text-gray-700 ">
      <DetailList data={data} fields={calibrationFields} />

      <div className="py-4">
        <p className={labelClass}>Comment</p>
        {data.comment ? (
          <p className="mt-1 whitespace-pre-line rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
            {data.comment}
          </p>
        ) : (
          <p className="text-sm">—</p>
        )}
      </div>

      <div>
        <p className={labelClass}>Certificate</p>
        {data.certificate_original_name ? (
          <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm">
            <FileText className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <span className="min-w-0 truncate" title={data.certificate_original_name}>
              {data.certificate_original_name}
            </span>
          </div>
        ) : (
          <p className="text-sm">No certificate attached</p>
        )}
      </div>
    </div>
  )
}
