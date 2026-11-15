const MODE = {
  wide: 'max-w-8xl',
  text: 'max-w-2xl',
  dashboard: 'max-w-4xl',
  instrument_details: 'max-w-4xl',
}

export default function PageLayout({ title, actions, info, mode = 'wide', children }) {
  return (
    <div className={`mx-auto w-full ${MODE[mode]} px-4 py-4`}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {actions}
      </div>
      {info && (
        <div className="min-h-20">
          <p className="text-sm text-gray-500 mb-4">{info}</p>
        </div>
      )}
      {children}
    </div>
  )
}
