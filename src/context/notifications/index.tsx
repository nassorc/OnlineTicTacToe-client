import { createContext, useEffect } from "react";
import notify from "../../utils/toastNotify";
import { useSocket } from "../socket";

const NotificationContext = createContext(null);

interface PropsType {
  action: (data: any) => void
  children: React.ReactNode
}

export function GameInvitationNotificationProvider(props: PropsType) {
  const { action } = props;
  const { socket } = useSocket();
  if(socket.active) throw new Error("Inactive socket");
  const { children } = props;
  // notification socket event listeners
  useEffect(() => {
    // event if player sends an invite to the user
    function onInvited(data) {
      action(data);
    }
    socket.on("user:invited", onInvited);

    return () => {
      socket.off("user:invited", onInvited);
    }
  }, [socket]);
  return (
    <NotificationContext.Provider value={1}>
      {children}
    </NotificationContext.Provider>
  )
}

export default GameInvitationNotificationProvider;