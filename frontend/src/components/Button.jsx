const variants = {
  primary: 'border border-transparent bg-primary text-white hover:opacity-90',
  secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  text_link: 'border border-transparent text-blue-600 hover:text-blue-800',
  ghost: 'border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900',
}

export default function Button({ variant = 'secondary', className, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
