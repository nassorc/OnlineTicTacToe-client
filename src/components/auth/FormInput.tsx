interface inputProps {
  label: string,
  value: string, 
  onChange: (e: React.ChangeEvent) => void 
}

export function FormInput(props: inputProps) {
  const {label, onChange, ...inputProps} = props;
  return(
    <div className='flex flex-col items-start'>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} className='py-2 px-3 w-full rounded-sm'/>
    </div>
  )
}