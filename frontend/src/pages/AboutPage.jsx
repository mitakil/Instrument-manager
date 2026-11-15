import PageLayout from '../layout/PageLayout'
import PermissionMatrix from '../features/auth/Permissions'

export default function About() {
  return (
    <PageLayout title="About" mode="dashboard">
      <div className="space-y-4 text-gray-700">
        <section className="mb-8">
          <p className="leading-relaxed mb-4">
            Instrument Manager keeps a laboratory’s instruments, calibrations and quality checks in
            one place. It replaces scattered spreadsheets with a single view of what is in use, what
            is due for calibration, and what needs attention.
          </p>
          <p className="leading-relaxed">
            Every calibration certificate, QC status change and maintenance note is recorded with
            its author and time, building an unbroken record for each instrument. This supports
            metrological traceability: the lab can show when an instrument was last calibrated, what
            its status was at any point, and who did what.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="textlg font-semibold uppercase tracking-wide text-gray-900 mb-3">
            Permissions
          </h2>
          <p className="mb-4">Based on role users have different permissions:</p>
          <PermissionMatrix />
        </section>
      </div>
    </PageLayout>
  )
}
