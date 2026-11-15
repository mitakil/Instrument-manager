import { useParams } from 'react-router-dom'

import useInstrument from './useInstrument'
import PageLayout from '../../layout/PageLayout'
import InstrumentDetails from './InstrumentDetails'
import QcComponent from '../qc/QcComponent'
import CalibrationComponent from '../calibrations/CalibrationComponent'
import InstrumentChangesComponent from '../auditlog/InstrumentChangesComponent'

export default function InstrumentPage() {
  const { id } = useParams()
  const { data, loading, error, refetch } = useInstrument(id)

  if (error) return <div className="px-6 py-12 text-sm text-red-600">Failed to load instrument</div>
  if (loading || !data) return <div className="px-6 py-12 text-sm text-gray-400">Loading...</div>

  return (
    <PageLayout mode="instrument_details" title={data.name}>
      <InstrumentDetails data={data} id={id} onUpdate={refetch} />
      <QcComponent data={data} />
      <CalibrationComponent data={data} />
      <InstrumentChangesComponent />
    </PageLayout>
  )
}
