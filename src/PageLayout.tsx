import Header from "./components/Header"
import { Outlet } from "react-router-dom"

interface layoutProps {
  children: React.ReactNode
}

export default function PageLayout(props: layoutProps) {
  return (
    <div className="mt-20">
      <Header />
      <Outlet />
    </div>
  )
}
