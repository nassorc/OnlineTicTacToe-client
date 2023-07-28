import Header from "./components/navbar/Header"
import { Outlet } from "react-router-dom"

interface layoutProps {
  children: React.ReactNode
}

export default function PageLayout(props: layoutProps) {
  return (
    <div className="pt-28">
      <Header />
      <section className="min-h-body-height">
        <Outlet />
      </section>
    </div>
  )
}
