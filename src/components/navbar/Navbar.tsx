interface PropsType {
  children: React.ReactNode
}

export default function Navbar(props: PropsType) {
  return(
    <nav className="m-0 p-0 h-full container flex justify-end items-center">
      <ul className="flex relative">
        {props.children}
      </ul>
    </nav>
  )
}