import React, { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import * as Constants from "../../config/constants";

const socket = io(Constants.BASEURL, {
    autoConnect: false,
    withCredentials: true,
});
const SocketContext = createContext(socket);

interface StateType {
    children: React.ReactElement
}

export function useSocket() {
    const socket = useContext(SocketContext);
    const connect = (payload: {userId: string}) => {
      socket.auth = {userId: payload.userId};
      socket.connect();
    }
    return {socket, connect};
}

export function SocketProvider({children}: StateType) {
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;