import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/socket"

export default function InviteNotification({playerId, playerUsername, roomId}: {playerId: string, playerUsername: string, roomId: string}) {
    const { socket } = useSocket();
    const navigate = useNavigate();
    const handleAccept = () => {
      localStorage.setItem('roomId', roomId);
      socket.emit("user:acceptInvitation", {playerId, roomId});
      navigate("/game");
    }
    const handleReject = () => {
        socket.emit("user:rejectsInvitation", playerId);
    }
    return(
      <div className="absolute right-0 top-0 flex">
          <p>{playerUsername}</p>
          <button onClick={handleAccept}>accept</button>
          <button onClick={handleReject}>reject</button>
      </div>
    )
}