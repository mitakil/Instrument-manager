import { labelClass, fieldClass } from './formStyles'
export default function FormInput({ label, className = 'mb-2', ...props }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      <input className={fieldClass} {...props} />
    </div>
  )
}
