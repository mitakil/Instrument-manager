export default function Card({ title, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white shadow-sm p-6 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
        </div>
      )}
      <div>{children}</div>
    </section>
  )
}
