import { useState, useMemo } from 'react'
import useInstruments from './useInstruments'
import PageLayout from '../../layout/PageLayout'
import InstrumentToolBar from './InstrumentToolBar'
import InstrumentTable from './InstrumentTable'
import Button from '../../components/Button'
import QuickFilters from './QuickFilters'
import AddInstrumentModal from './AddInstrumentModal'

export default function InstrumentsPage() {
  const { data, loading, error, refetch } = useInstruments()
  const [filters, setFilters] = useState({
    text: '',
    group: '',
    assetId: '',
    status: '',
    qcStatus: '',
  })
  const [showForm, setShowForm] = useState(false)

  const closeForm = () => setShowForm(false)

  const filtered = useMemo(() => {
    const text = filters.text.trim().toLowerCase()
    return data.filter((i) => {
      const byText =
        !text ||
        (i.name ?? '').toLowerCase().includes(text) ||
        (i.asset_id ?? '').toLowerCase().includes(text)
      const byGroup = !filters.group || i.group === filters.group
      const byStatus = !filters.status || i.calib_status === filters.status
      const byQc = !filters.qcStatus || i.spc_status === filters.qcStatus
      return byText && byGroup && byStatus && byQc
    })
  }, [data, filters])

  const groups = useMemo(
    () => [...new Set(data.map((i) => i.group).filter(Boolean))].sort(),
    [data]
  )

  return (
    <PageLayout
      title="Instruments"
      mode="dashboard"
      actions={
        <div className="mt-2 flex gap-2">
          <Button
            variant={showForm ? 'secondary' : 'primary'}
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? 'Cancel' : 'Add instrument'}
          </Button>
        </div>
      }
    >
      {showForm && <AddInstrumentModal onClose={closeForm} onCreated={refetch} />}

      <div className="mb-4">
        <QuickFilters items={data} value={filters} onChange={setFilters} />
        <InstrumentToolBar value={filters} onChange={setFilters} groups={groups} items={data} />
      </div>
      <InstrumentTable items={filtered} pageLoading={loading} pageError={error} />
    </PageLayout>
  )
}
