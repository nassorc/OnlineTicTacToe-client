import { useEffect, useState, useContext, useMemo } from "react"
import { useAuth } from "../../context/auth/context";
import { useSocket } from "../../context/socket";
import InviteSearch from "../../components/InviteSearch";

import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { 
  acceptFriendRequest, 
  addFriend, 
  getUser, 
  rejectFriendRequest 
} from "../../api/api";
import useUser from "../../hooks/useUser";
import notify from "../../utils/toastNotify";

import { 
  Card, 
  CardHeader, 
  CardContent 
} from "../../components/ui/UICard";

import useSocketManager from "../../hooks/useSocketManager";
import { events } from "./socketEvents";
import { FriendCard } from "../../components/ui/FriendCard";

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
  const { socket, connect } = useSocket();
  const navigate = useNavigate();
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [authState, authDispatch] = useAuth();
  const {
    friends, 
    friendInvites,
    setUser, 
    setFriends, 
    setFriendInvites, 
    setFriendOnlineStatus, 
    addNewFriendRequest, 
    removeFriendRequest
  } = useUser();
  // const {socket, connect, emitEvent, defineSocketListener} = useSocketManager([]);


  const handleUserAcceptGameInvite = (playerId, roomId) => {
    localStorage.setItem('roomId', roomId);
    socket.emit("user:acceptInvitation", {playerId, roomId});
    navigate("/game");
  }
  const handlerUserRejectGameInvite = (playerId, roomId) => {
    socket.emit("user:rejectInvitation", { playerId: playerId, roomId: roomId });
  }

  // get user information
  useEffect(() => {
    (async function() {
      const user = await getUser(authState.userId);
      setUser(user);
      setFriends(user.friends);
      setFriendInvites(user.friendInvites);
    })();
  }, [authState]);

  // socket event listeners 
  useEffect(() => {
    connect({userId: authState.userId});

    function onReceiveFriendRequest(message) {
      addNewFriendRequest(message)
    }
    // event if player sends an invite to the user
    function onInvited(data: invitationStateType) {
      notify(data.from.userId, data.from.username, data.roomId, handleUserAcceptGameInvite, handlerUserRejectGameInvite);
    }
    // if player accepts users game invitation
    function onAcceptInvitation(data) {
      localStorage.setItem('roomId', data.roomId);
      navigate("/game");
    }
    function onRejectInvitation(data) {
      console.log("user rejected your invitation");
    }
    function onFriendConnected(id) {
      setFriendOnlineStatus(id, true);
    }
    function onFriendDisconnected(id) {
      setFriendOnlineStatus(id, false);
    }

    socket.on("user:receiveFriendRequest", onReceiveFriendRequest);
    socket.on("user:invited", onInvited);
    // defineSocketListener("user:invited", function(data) {notify(data.from.userId, data.from.username, data.roomId, handleUserAcceptGameInvite, handlerUserRejectGameInvite);})
    socket.on("user:acceptsInvitation", onAcceptInvitation);
    socket.on("user:rejectInvitation", onRejectInvitation);
    socket.on("friend:connected", onFriendConnected);
    socket.on("friend:disconnected", onFriendDisconnected);
    // defineSocketListener("friend:connected", onFriendConnected);
    // defineSocketListener("friend:disconnected", onFriendDisconnected);
    
    return () => {
      // socket.disconnect();
      socket.off("user:receiveFriendRequest", onReceiveFriendRequest);
      socket.off("user:invited", onInvited);
      socket.off("user:acceptsInvitation", onAcceptInvitation);
      socket.off("user:rejectInvitation", onRejectInvitation);
      socket.off("friend:connected", onFriendConnected);
      socket.off("friend:disconnected", onFriendDisconnected);
    }
  }, [socket]);

  const handleInvitePlayer = (playerId: string) => {
    socket.emit("user:invitePlayer", {playerId: playerId});
  }

  const handleAddFriend = (userId: string) => {
    // addFriend(userId);
    socket.emit("user:addFriend", {friendId: userId})
  }

  const FriendsComponents = useMemo(() => 
    friends
      .sort((a, b) => b.online - a.online)
      .map(friend => (
      <FriendCard key={friend._id} id={friend._id} username={friend.username} online={friend.online} playing={false} inviteFriend={handleInvitePlayer} />
    )), [friends]
  )

  return(
    <>
      <Toaster />
      {/* <section className="container mx-auto flex flex-col items-center"> */}
      <section className="container mx-auto lg:max-w-[1024px] flex flex-col items-center">
        <div className="md:grid md:grid-cols-10 md:grid-rows-3 w-full h-[80vh] gap-4 ">
          <div className="md:col-span-6 md:row-span-3 max-h-full">
            <Card>
              <CardHeader>
                <InviteSearch setSearchQueryResult={setSearchQueryResult}/>
              </CardHeader>
              <CardContent>
                {
                  searchQueryResult.map(( user: any ) => {
                    return (
                      <div key={user._id} className="hover:bg-[#292929] mx-auto my-3 py-2 px-3 max-w-2xl flex items-center justify-end rounded-sm border border-[#626262]/40">
                        <div className="w-full h-full flex items-center gap-x-3">
                          <div className="w-[40px] h-[40px] rounded-full bg-yellow-300"></div>
                          <p className="text-white font-bold">{user.username}</p>
                          <p className="text-[#898989]">{user.email}</p>
                        </div>
                        {(friends?.filter(friend => friend._id === user._id).length === 0) && (
                          <button onClick={() => {handleAddFriend(user._id)}} className="flex">
                            <div className="max-w-max h-[10px] rounded-full bg-green-400"></div>
                            add friend
                          </button>
                        )}

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
                      </div>
                    )
                  })
                }
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-4 md:row-span-2">

            <Card>
              <CardHeader>
                Friends
              </CardHeader>
              <CardContent>
                {FriendsComponents}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <Card>
              <CardHeader>
                Friend Requests
              </CardHeader>
              <CardContent>
                {friendInvites?.map(invites => (
                  <div className="mx-auto my-2 py-2 px-3 flex border justify-between border-[#626262]/40 rounded-sm">
                    <div className="flex items-center gap-x-2">
                      <p className="text-white font-bold">{invites.sender.username}</p>
                    </div>
                    <div className="flex gap-x-3">
                      <button onClick={async () => {
                        acceptFriendRequest(invites.sender._id);
                        removeFriendRequest(invites.sender.id);
                      }}>accept</button>
                      <button onClick={() => {
                        rejectFriendRequest(invites.sender._id);
                      }}>decline</button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
          </div>
        </div>

      {/* <div className="w-full grid 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          <div className="mx-auto px-3 w-full mt-auto mb-8">
            <div className="ml-auto w-fit mb-3 text-lg font-bold">Friend Requests</div>

              {friendInvites?.map(invites => (
                <div className="mx-auto my-2 py-2 px-3 flex border justify-between border-[#626262]/40 rounded-sm">
                  <div className="flex items-center gap-x-2">
                    <p className="text-white font-bold">{invites.sender.username}</p>
                  </div>
                  <div className="flex gap-x-3">
                    <button onClick={async () => {
                      acceptFriendRequest(invites.sender._id);
                    }}>accept</button>
                    <button onClick={() => {
                      rejectFriendRequest(invites.sender._id);
                    }}>decline</button>
                  </div>
                </div>
              ))}
            </div>
      </div>
      
       */}


      </section>
    </>
  )
}

export default Play;