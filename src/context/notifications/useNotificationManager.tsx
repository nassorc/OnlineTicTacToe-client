import { useState, useEffect } from "react";
import { useSocket } from "../socket";

const NOTIFICATION = {
  GAME_INVITE: "notification:gameInvite",
  FRIEND_REQUEST: "notification:friendRequest",
}

export default function useNotificationManager() {
  const { socket } = useSocket();
  const [notificationEventListener, setNotificationEventListener] = useState({});
  console.log(notificationEventListener)

  useEffect(() => {
    function gameInvite(data) {
      for (const event of notificationEventListener["notification:gameInvite"]) {
        console.log('EVENT');
        event(data);
      }
    }
    socket.on(NOTIFICATION.GAME_INVITE, gameInvite);
    return () => {
      socket.off(NOTIFICATION.GAME_INVITE, gameInvite);
    }
  }, [socket, notificationEventListener]);

  const addNotificationListener = (name, action) => {
    if (name in notificationEventListener) {
      setNotificationEventListener(prev => {
        const newState = {...prev};
        newState[name].push(action);
        return newState;
      })
    }
    else {
      setNotificationEventListener(prev => ({
        ...prev,
        [name]: [action]
      }))
    }
  }

  return {
    addNotificationListener
  };
}