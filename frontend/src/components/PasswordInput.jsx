import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  label,
  value = '',
  onChange,
  className = 'mb-2',
  ...props
}) {
  const [show, setShow] = useState(false)
  const hasValue = value?.length > 0

  return (
    <div className={`relative ${className}`}>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-700"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  )
}
