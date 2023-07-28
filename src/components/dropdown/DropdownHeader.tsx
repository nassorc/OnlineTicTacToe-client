interface PropsType {
  children: React.ReactNode
}
export default function DropdownHeader(props: PropsType) {
  const {children} = props;
  return (
    <div className="px-3 py-3">{children}</div>
  )
}
