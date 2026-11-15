import { labelClass } from './formStyles'

export default function FormRadioInput({
  label,
  name, // name of the radio button group
  options, // list of options to be selected from radio buttons
  value, // selected value
  onChange, // function to handle change event
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <legend className={`${labelClass} float-left mr-6`}>{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            className="appearance-auto"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}
