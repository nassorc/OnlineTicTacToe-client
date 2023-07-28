interface PropsType {
  show: boolean
  children: React.ReactNode
}

export default function DropdownMenu(props: PropsType) {
  const { show } = props;
  return(
    <div 
      className="mx-3 mt-4 absolute top-full right-0 w-[280px] bg-base-500 rounded-sm shadow-2xl"
      style={{
        display: show ? "block" : "none"
      }}
    >
      {props.children}
    </div>
  )
}