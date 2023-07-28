import { forwardRef } from "react";
import { Triangle } from "lucide-react"

interface PropsType { 
  icon: string | React.ReactNode
  selected?: boolean
  onClick?: (...args: any[]) => void
  children?: React.ReactNode
}
const NavLink = forwardRef(function NavLink(props: PropsType, ref) {
  const { icon, selected, children, ...navProps } = props;
  return(
    <li 
      ref={ref}
      {...navProps}
      className="mx-3"
    >
      <span className={`${selected ? "text-primary-400" : "white"}`}>
        { props.icon }
      </span>
      {props.children && props.children}
    </li>
  )
})
export default NavLink;