const tableGrid = 'grid grid-cols-7 gap-4 items-center'

export default function InstrumentChangesTable() {
  return (
    <div>
      <div
        className={`${tableGrid} sticky top-0 z-10 border-b border-gray-300 bg-white/80 px-6 py-2 text-xs text-gray-500 backdrop-blur`}
      >
        <div className="col-span-3">Change date</div>
        <div className="col-span-3">Changes</div>
      </div>
    </div>
  )
}
