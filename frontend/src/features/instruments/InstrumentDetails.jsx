import { useState } from 'react'
import { formatDate } from '../../utils/formatDateTime'
import Button from '../../components/Button'
import EditInstrumentModal from './EditInstrumentModal'

export default function InstrumentDetails({ data, id, onUpdate }) {
  const [showForm, setShowForm] = useState(false)
  const closeForm = () => setShowForm(false)

  const detailFields = [
    { key: 'group', label: 'Group' },
    { key: 'instrument_location', label: 'Location' },
    { key: 'asset_id', label: 'Asset ID' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'serial', label: 'Serial' },
    { key: 'model', label: 'Model' },
    { key: 'software', label: 'Software' },
    { key: 'software_version', label: 'Software version' },
    { key: 'calibration_frequency', label: 'Calibration interval', format: (v) => `${v} months` },
    { key: 'createdAt', label: 'Created', format: formatDate },
  ]

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Details</h2>
        {!showForm && (
          <div className="mt-2 flex gap-2">
            <Button
              variant={showForm ? 'secondary' : 'primary'}
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? 'Cancel' : 'Edit instrument'}
            </Button>
          </div>
        )}
      </div>
      <dl className="grid grid-cols-4 gap-y-2 text-sm">
        {detailFields.map(({ key, label, format }) => (
          <div key={key}>
            <dt className="text-gray-400">{label}</dt>
            <dd>{data[key] === null ? '—' : format ? format(data[key]) : data[key]}</dd>
          </div>
        ))}
      </dl>

      {showForm && (
        <EditInstrumentModal data={data} id={id} onClose={closeForm} onUpdate={onUpdate} />
      )}
    </section>
  )
}
