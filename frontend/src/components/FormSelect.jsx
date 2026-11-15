import { labelClass, fieldClass } from './formStyles'

export default function FormSelect({
  label,
  options, // list of options to be selected from dropdown list
  value,
  onChange,
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`${fieldClass} appearance-none pl-3 pr-9`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
