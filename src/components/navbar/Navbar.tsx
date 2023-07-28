interface PropsType {
  children: React.ReactNode
}

export default function Navbar(props: PropsType) {
  return(
    <nav className="mx-auto h-full container flex justify-end items-center">
      <ul className="flex relative">
        {props.children}
      </ul>
    </nav>
  )
}