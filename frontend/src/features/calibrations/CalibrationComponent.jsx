import { useState } from 'react'
import { useParams } from 'react-router-dom'

import useCalibrations from './useCalibrations'
import Button from '../../components/Button'
import CalibrationModal from './CalibrationModal'
import CalibrationHistoryTable from './CalibrationHistoryTable'

export default function CalibrationComponent() {
  const { id } = useParams()
  const { data, loading, error, refetch } = useCalibrations(id)
  const [showForm, setShowForm] = useState(false)
  if (error) return <div className="px-6 py-12 text-sm text-red-600">Failed to load instrument</div>
  if (loading || !data) return <div className="px-6 py-12 text-sm text-gray-400">Loading...</div>

  const closeForm = () => setShowForm(false)

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Calibration</h2>
        {!showForm && (
          <Button
            variant={showForm ? 'secondary' : 'primary'}
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? 'Cancel' : 'Add calibration'}
          </Button>
        )}
      </div>
      <CalibrationHistoryTable items={data} pageLoading={loading} pageError={error} />
      {showForm && <CalibrationModal onClose={closeForm} instrumentId={id} onDone={refetch} />}
    </section>
  )
}
