import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth/context";
import InviteNotification from "../../components/InviteNotification";
import InviteSearch from "../../components/InviteSearch";
import { useSocket } from "../../context/socket";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react"

interface playerType {
    userId: string,
    username: string,
}

interface invitationStateType {
  roomId: string,
  from: playerType,
  to: playerType,
}    

function Play() {
  const notify = () => toast.custom(t => 
    <div className="flex bg-white text-black rounded-sm border border-black/30">
      <div className="py-2 px-4 w-max flex items-center">
        player invited you
      </div>
      <button 
        className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
        onClick={() => { 
          toast.dismiss(t.id)
        }}
      ><Check className="text-green-400"/></button>
      <button 
        className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      ><X className="text-red-400"/></button>
    </div>,
    {
      duration: Infinity,
      position: 'top-right',

      // Styling
      style: {},
      className: '',

      // Custom Icon
      icon: '👏',

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
  });
  const { socket, connect } = useSocket();
  const navigate = useNavigate();
  const [inviteList, setInviteList] = useState([]);
  const [invitations, setInvitations] = useState<invitationStateType[]>([]);
  const [authState, authDispatch] = useAuth();
    
  useEffect(() => {
    connect({userId: (authState as any).userId});
    // event if player sends an invite to the user
    function onInvited(data: invitationStateType) {
      notify();
      setInvitations(prev => {
        return [...prev, data];
      })
    }
    // if player accepts users game invitation
    function onAcceptInvitation(data) {
      localStorage.setItem('roomId', data.roomId);
      navigate("/game");
    }
    function onRejectInvitation(data) {
      console.log("user rejected your invitation");
    }

    socket.on("user:invited", onInvited);
    socket.on("user:acceptsInvitation", onAcceptInvitation);
    socket.on("user:rejectInvitation", onRejectInvitation);
    
    return () => {
      // socket.disconnect();
      socket.off("user:invited", onInvited);
      socket.off("user:acceptsInvitation", onAcceptInvitation);
      socket.off("user:rejectInvitation", onRejectInvitation);
    }
  }, [authState]);

  const handleInvitePlayer = (playerId: string) => {
    socket.emit("user:invitePlayer", playerId);
  }

  return(
    <>
      <Toaster />
      <section className="pt-20 min-h-screen container mx-auto flex flex-col items-center">
        {
          invitations.map((invitation: invitationStateType) => {
            return <InviteNotification key={invitation.from.userId} playerId={invitation.from.userId} playerUsername={invitation.from.username} roomId={invitation.roomId}/>
          })
        }

      <div className="w-full">
        <InviteSearch setInviteList={setInviteList}/>
        {
          inviteList.map(( user: any ) => {
            console.log(user);
            return (
              <div key={user._id} className="hover:bg-[#292929] mx-auto my-3 py-2 px-3 max-w-2xl flex items-center justify-end rounded-sm border border-[#626262]/40">
                <div className="w-full h-full flex items-center gap-x-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-yellow-300"></div>
                  <p className="text-white font-bold">{user.username}</p>
                  <p className="text-[#898989]">{user.email}</p>
                </div>

                {(user?.online) ? (
                  <button onClick={() => {handleInvitePlayer(user._id)}} className="flex">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
                    invite
                  </button>
                ) : (
                <div className="py-2 px-4 flex bg-[#1a1a1a] rounded-md pointer-events-none">
                  <div className="w-[10px] h-[10px] rounded-full bg-red-400"></div>
                  offline
                </div>
                )}

                {/* <button onClick={() => {handleInvitePlayer(user._id)}} className="flex">
                  {(user?.online) ? (
                    <>
                      <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
                      invite
                    </>
                  ) : (
                    <>
                      <div className="w-[10px] h-[10px] rounded-full bg-red-400"></div>
                      offline
                    </>
                  )

                  }
                </button> */}
              </div>
            )
          })
        }
      </div>
      </section>
    </>
  )
}

export default Play;