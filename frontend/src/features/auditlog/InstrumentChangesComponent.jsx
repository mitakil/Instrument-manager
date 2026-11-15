import InstrumentChangesTable from './InstrumentChangesTable'

export default function InstrumentChangesComponent() {
  return (
    <section className="mb-8">
      <div className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
          Instrument change log
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        An audit trail of changes to this instrument (what, when and by whom) will be shown here.
      </p>
    </section>
  )
}
