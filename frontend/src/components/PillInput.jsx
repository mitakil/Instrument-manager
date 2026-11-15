export default function PillInput({
  label = 'search',
  value,
  onChange,
  placeholder,
  icon,
  size = 'md',
  width = 'w-40',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'h-8 text-sm px-3 rounded-full',
    md: 'h-10 text-base px-4 rounded-md',
    lg: 'h-12 text-base px-5 rounded-full',
  }
  return (
    <label
      className={`inline-flex items-center gap-2 bg-white border border-gray-300 ${sizes[size]} ${width} shadow-sm focus-within:ring-2 focus-within:ring-primary/60 focus-within:border-primary/60 transition ${className}`}
    >
      {icon && <span className="text-gray-500">{icon}</span>}
      <span className="sr-only">{label}</span>
      <input
        className="w-full outline-none placeholder:text-gray-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </label>
  )
}
