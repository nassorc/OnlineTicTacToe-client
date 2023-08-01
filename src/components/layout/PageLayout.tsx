import Header from "../navbar/Header"
import { Outlet } from "react-router-dom"

import useNotificationManager from "../../context/notifications/useNotificationManager"
import { useEffect } from "react";

export default function PageLayout() {
  const { addNotificationListener } = useNotificationManager();

  // register nofifcations
  useEffect(() => {
    addNotificationListener("notification:gameInvite", (data) => {
      console.log("karen served: ", data);
    })
  }, []);

  return (
    <div className="pt-28">
      <Header />
      <section className="min-h-body-height">
        <Outlet />
      </section>
    </div>
  )
}
