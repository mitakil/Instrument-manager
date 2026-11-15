import { useState } from 'react'
import { useParams } from 'react-router-dom'
import QcCheckModal from './QcCheckModal'
import Button from '../../components/Button'
import { generateQcSeries } from '../../components/qcDemoData'
import ControlChart from './ChartDemo'

export default function QcComponent() {
  const { id } = useParams()
  const [showForm, setShowForm] = useState(false)

  const latestSPC = generateQcSeries()

  const closeForm = () => setShowForm(false)

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
          Quality control check
        </h2>
        {!showForm && (
          <div className="mt-2 flex gap-2">
            <Button
              variant={showForm ? 'secondary' : 'primary'}
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? 'Cancel' : 'Add QC check'}
            </Button>
          </div>
        )}
      </div>
      {latestSPC ? (
        <ControlChart data={generateQcSeries()} title="pH QC check (buffer 7.00)" unit="pH" />
      ) : (
        <p className="italic text-gray-400 text-sm mb-4">No quality control checks</p>
      )}

      {showForm && <QcCheckModal instrumentId={id} onClose={closeForm} onDone={closeForm} />}
    </section>
  )
}
