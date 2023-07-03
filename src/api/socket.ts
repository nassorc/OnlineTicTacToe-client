import { io } from "socket.io-client";
import { BASEURL } from "../constants";

const socket = io(BASEURL, {
    autoConnect: false,
    withCredentials: true,
})

export default socket;