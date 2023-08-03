import { useEffect, useState, useMemo } from "react"
import { useAuth } from "../../context/auth/context";
import { useSocket } from "../../context/socket";
import InviteSearch from "../../components/InviteSearch";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import notify from "../../lib/toastNotify";
import { 
  acceptFriendRequest, 
  addFriend, 
  getUser, 
  rejectFriendRequest 
} from "../../api/api";
import useUser from "../../hooks/useUser";
import { FriendCard } from "../../components/FriendCard";
import { 
  Card, 
  CardHeader, 
  CardContent 
} from "../../components/UICard";

import Board from "../Game/NewBoard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select"
import NewGame from "../Game/NewGame";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

function Play() {
  
  const [isPlaying, setIsPlaying] = useState(false);


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

  const [selectedMenu, setSelectedMenu] = useState<"players" | "play" | "requests">("players");
  const [selectedPlayerSubMenu, setSelectedPlayerSubMenu] = useState<"friends" | "all">("friends");
  
  // const {socket, connect, emitEvent, defineSocketListener} = useSocketManager([]);


  const handleUserAcceptGameInvite = (playerId, roomId) => {
    localStorage.setItem('roomId', roomId);
    socket.emit("user:acceptInvitation", {playerId, roomId});
    setIsPlaying(true);
    // navigate("/game");
    navigate(0);
  }
  const handlerUserRejectGameInvite = (playerId, roomId) => {
    socket.emit("user:rejectInvitation", { playerId: playerId, roomId: roomId });
  }

  // dismiss or unmount active toast notifications
  useEffect(() => {
    return () => { toast.dismiss(); }
  }, []);

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
      setIsPlaying(true);
      // navigate("/game");
      navigate(0);
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
    socket.on("user:acceptsInvitation", onAcceptInvitation);
    socket.on("user:rejectInvitation", onRejectInvitation);
    socket.on("friend:connected", onFriendConnected);
    socket.on("friend:disconnected", onFriendDisconnected);
    
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
    toast((t) => (<span className="space-x-2">
      <span>
        Waiting for player
      </span>
      <button 
        className="bg-slate-200"
        onClick={() =>  {
          toast.dismiss(t.id)
        }}
      >
        cancel
      </button>
    </span>), {
      icon: <div className="w-[14px] h-[14px] block rounded-full border-[3px] border-gray-400 border-t-4 border-t-gray-700 animate-spin"></div>,
      duration: Infinity,
    });
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
      <FriendCard 
        key={friend._id} 
        id={friend._id} 
        username={friend.username} 
        online={friend.online} 
        playing={false} 
        inviteFriend={handleInvitePlayer}
      />
    )), [friends]
  )

  return(
    <>
      <Toaster />
      <section className="container mx-auto flex flex-col items-center">
        <div className="md:grid md:grid-cols-10 md:grid-rows-4 w-full h-[80vh] gap-4 ">
          <div className="md:col-span-6 md:row-span-3 max-h-full xl:col-span-7">
            <NewGame />
          </div>
          <div className="md:col-span-4 md:row-span-4 xl:col-span-3 xl:col-start-8">
            <div className="w-full min-h-full bg-white shadow-md rounded-sm overflow-hidden">

              <div className="w-full bg-slate-300">
                <ul className="flex">
                  <li 
                  className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-[#0b132b] hover:bg-[#1d3169] text-white select-none cursor-pointer", selectedMenu === "play" && "bg-white text-[#0b132b] hover:bg-white")}
                    onClick={() => {
                      setSelectedMenu("play")
                  }}>
                    {/* <Icons.sword /> */}
                    <div>Play</div>
                  </li>
                  <li 
                  className={cn("flex flex-col justify-center text-center basis-0 grow bg-[#0b132b] text-white", selectedMenu === "players" && "bg-white text-[#0b132b]")}
                  onClick={() => {
                    setSelectedMenu("players")
                  }}>
                    {/* <Icons.users /> */}
                    <div>Players</div>
                  </li>
                  <li 
                  className={cn("flex flex-col justify-center text-center basis-0 grow bg-[#0b132b] text-white", selectedMenu === "requests" && "bg-white text-[#0b132b]")}
                  onClick={() => {
                    setSelectedMenu("requests")
                  }}>
                    {/* <Icons.userPlus /> */}
                    Friend Requests
                  </li>
                </ul>
              </div>

              {selectedMenu === "players" &&
                <div>
                    <ul className="flex border-b-2 border-[#edeff5]">
                      <li 
                        className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-white text-[#0b132b]", selectedPlayerSubMenu === "friends" && "border-b-4 border-black")}
                        onClick={() => {
                        setSelectedPlayerSubMenu("friends");
                      }}>Friends</li>

                      <li
                        className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-white text-[#0b132b]", selectedPlayerSubMenu === "all" && "border-b-4 border-black")}
                        onClick={() => {
                        setSelectedPlayerSubMenu("all");
                      }}>All Players</li>
                    </ul>
                  {selectedPlayerSubMenu === "friends" && FriendsComponents}
                  {selectedPlayerSubMenu === "all" && 
                    <div>  
                      <InviteSearch setSearchQueryResult={setSearchQueryResult}/>
                      <div>
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
                                <button 
                                  onClick={() => {handleInvitePlayer(user._id)}}
                                  // className="flex disabled:bg-base-500 disabled:text-base-100"
                                  className="flex disabled:opacity-30"
                                >
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
                      </div>
                    </div>
                  }
                </div>
              }
              

              {selectedMenu === "requests" && friendInvites?.map(invites => (
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

              { selectedMenu === "play" && 
              <div className="w-full">
                <div>Rating: 400</div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select game mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Game</SelectLabel>
                      <SelectItem value="7">7 wins</SelectItem>
                      <SelectItem value="3">3 wins</SelectItem>
                      <SelectItem value="1">1 win</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button disabled className="w-full">Play (Coming soon)</Button>
                <p>Feature is still under development. Find a friend to start playing.</p>

                <div>
                  <p>7 wins - first to make 7 wins</p>
                  <p>3 wins - first to make 3 wins</p>
                  <p>1 win - first to win</p>
                </div>
              </div> }

            </div>

            {/* <Card>
              <CardHeader>
                Friends
              </CardHeader>
              <CardContent>
                {FriendsComponents}
              </CardContent>
            </Card> */}
          </div>
          {/* <div className="md:col-span-4 md:col-start-7">
            
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Play;