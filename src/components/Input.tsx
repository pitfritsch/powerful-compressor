interface IProps {
  id: string,
  type: string,
  label: string,
  labelClassName?: string,
  className?: string,
  value?: boolean | string | number,
  onChange?: (target: HTMLInputElement) => void,
  placeholder?: string,
  min?: number,
  max?: number,
  step?: number,
}

export default function Input({ id, type, labelClassName, className, value, onChange, label, placeholder, min, max, step }: IProps) {
  
  if (type === 'checkbox'){
    return (
      <>
        <input
          className={className}
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target)}
        />
        <label className={labelClassName} htmlFor={id}>{label}</label>
      </>
    )
  }
  return (
    <>
      <label className={labelClassName} htmlFor={id}>{label}</label>
      <input 
        className='text-gray-500 pl-2'
        type="number" 
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target)}
        min={min}
        max={max}
        step={step}
      />
    </>
  )
}
