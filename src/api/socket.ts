import { io } from "socket.io-client";
import { BASEURL } from "../config/constants";

const socket = io(BASEURL, {
    autoConnect: false,
    withCredentials: true,
})

export default socket;