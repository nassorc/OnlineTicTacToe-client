import { useState, useEffect } from "react";
import { useSocket } from "../context/socket";
import { socketEvents} from "../config/socketEvents"

/**
 * Custom hook for managing socket instance, initializing socket events listenters and defining new socket emit functions.
 * Returns interface object for creating new socket listeners and a funciton for creating an emit function.
 * @returns 
 */
export default function useSocketManager(listeners?: SocketEventType[]) {
  // state stores the socket events 
  const [events, setEvents] = useState([]);
  const { socket, connect } = useSocket();

  useEffect(() => {
    // call listeners 
    events.forEach(event => {
      if(event.type === "on") {
        console.log(`socket.on('${event.name}', ${event.action.toString()})`)
        socket.on(event.name, event.action);
      }
    })

    return () => {
      socketEvents.forEach(event => {
        if(event.type === "on") {
          socket.off(event.name, event.action);
        }
      })
    }
  }, [socket, events]);

  // helper functions
  /**
   * Helper function - Function creates a socket `emit` handler
   * @param name emmitter name
   * @param payload data passed to the emitter
   */
  const emitEvent = (name: string, payload: SocketEmitEvent["payload"]) => {
    socket.emit(name, payload);
  }

  /**
   * Helper function - Function defines a new socket `on` listener
   * @param name 
   * @param content 
   */
  const defineSocketListener = (name: string, content: SocketOnEvent["action"]) => {
    const listener: SocketEventType = {
      name,
      type: "on",
      action: content
    }
    // const updatedEvents: SocketEventType[] = [...events, listener];
    console.log(events);
    setEvents([...events, listener]);
  }

  return {
    socket,
    connect,
    events,
    emitEvent,
    defineSocketListener,
    emitters: socketEvents.filter(event => event.type === "emit")
  }
}