import { useEffect, useState, useMemo, useContext } from "react"
import { useAuth } from "../../context/auth/context";
import { useSocket } from "../../context/socket";
import PlayerSearch from "../../components/PlayerSearch";
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
import UserProfilePopover from "@/components/UserProfilePopover";

function Play() {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const { socket, connect } = useSocket();
  const navigate = useNavigate();
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  // auth credentials
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
        profileImage={friend.profileImage}
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
                  className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-site-base hover:bg-site-base-hover text-white text-sm select-none cursor-pointer", selectedMenu === "play" && "bg-white text-[#0b132b] hover:bg-white")}
                    onClick={() => {
                      setSelectedMenu("play")
                  }}>
                    {/* <Icons.sword /> */}
                    <div>Play</div>
                  </li>
                  <li 
                  className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-site-base hover:bg-site-base-hover text-white text-sm select-none cursor-pointer", selectedMenu === "players" && "bg-white text-[#0b132b] hover:bg-white")}
                  onClick={() => {
                    setSelectedMenu("players")
                  }}>
                    {/* <Icons.users /> */}
                    <div>Players</div>
                  </li>
                  <li 
                  className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-site-base hover:bg-site-base-hover text-white text-sm select-none cursor-pointer", selectedMenu === "requests" && "bg-white text-[#0b132b] hover:bg-white")}
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
                        className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-white text-sm text-site-base hover:text-site-base-hover cursor-pointer select-none", selectedPlayerSubMenu === "friends" && "border-b-4 border-black")}
                        onClick={() => {
                        setSelectedPlayerSubMenu("friends");
                      }}>Friends</li>

                      <li
                        className={cn("py-3 flex flex-col justify-center text-center basis-0 grow bg-white text-sm text-site-base hover:text-site-base-hover cursor-pointer select-none", selectedPlayerSubMenu === "all" && "border-b-4 border-black")}
                        onClick={() => {
                        setSelectedPlayerSubMenu("all");
                      }}>All Players</li>
                    </ul>
                  {selectedPlayerSubMenu === "friends" && FriendsComponents}
                  {selectedPlayerSubMenu === "all" && 
                    <div>  
                      <PlayerSearch setSearchQueryResult={setSearchQueryResult}/>
                      <div>
                      {
                        searchQueryResult.map(( user: any ) => {
                          return (
                            <div key={user._id} className="px-3 flex justify-between items-center first:border-t-2 border-b-2 border-[#ebebeb]">
                              <UserProfilePopover userId={user._id}>
                                  <div className="py-1 flex space-x-2 select-none">
                                    <div className="w-[28px] h-[28px]">
                                      {user?.profileImage ?
                                        <img 
                                          className="block w-full h-full object-cover rounded-sm"
                                          src={user?.profileImage} 
                                          alt="profile image"
                                        /> :
                                        <div className="w-full h-full aspect-square bg-[slateblue] rounded-sm"></div>
                                      }
                                    </div>
                                    <p className="">{user.username}</p>
                                  </div>
                              </UserProfilePopover>
                              {/* <Popover>
                                <a href={`/user/${user.username}`} onClick={(e) => {e.preventDefault(); return}} >
                                  <PopoverTrigger asChild>
                                      <div className="py-1 flex space-x-2 select-none">
                                        <div className="w-[24px] h-[24px] aspect-square bg-[slateblue] rounded-sm"></div>
                                        <p className="">{user.username}</p>
                                      </div>
                                  </PopoverTrigger>
                                </a>
                                <PopoverContent className="w-[340px]">
                                  <div className="w-full flex  space-x-3">
                                    <div className="w-[48px] h-[48px] aspect-square bg-[slateblue] rounded-sm"></div>
                                    <div>
                                      <a href={`/user/${user.username}`} className="text-site-accent brightness-90">{user.username}</a>
                                      <p className="">{user.email}</p>
                                    </div>

                                    <div>

                                      {(friends?.filter(friend => friend._id === user._id).length === 0) && (
                                        <TooltipProvider>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <Button onClick={() => {handleAddFriend(user._id)}} size="icon" variant="ghost">
                                                    <Icons.userPlus className="w-[24px] h-[24px] aspect-square cursor-pointer"/>
                                                  </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Send Friend Request</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}

                                      <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button onClick={() => {handleInvitePlayer(user._id)}} size="icon" variant="ghost">
                                                  <Icons.sword className="w-[24px] h-[24px] aspect-square cursor-pointer"/>
                                                </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Challenge</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>

                                  </div>
                                </PopoverContent>
                              </Popover> */}

                              <p>{
                                user.playing  && "Playing"
                                || user.online && "Online"
                                || "Offline"
                              }</p>

                            </div>
                            // <div key={user._id} className="hover:bg-[#292929] mx-auto my-3 py-2 px-3 max-w-2xl flex items-center justify-end rounded-sm border border-[#626262]/40">
                            //   <div className="w-full h-full flex items-center gap-x-3">
                            //     <div className="w-[40px] h-[40px] rounded-full bg-yellow-300"></div>
                            //     <p className="text-white font-bold">{user.username}</p>
                            //     <p className="text-[#898989]">{user.email}</p>
                            //   </div>
                            //   {(friends?.filter(friend => friend._id === user._id).length === 0) && (
                            //     <button onClick={() => {handleAddFriend(user._id)}} className="flex">
                            //       <div className="max-w-max h-[10px] rounded-full bg-green-400"></div>
                            //       add friend
                            //     </button>
                            //   )}
                            //   {(user?.online) ? (
                            //     <button 
                            //       onClick={() => {handleInvitePlayer(user._id)}}
                            //       // className="flex disabled:bg-base-500 disabled:text-base-100"
                            //       className="flex disabled:opacity-30"
                            //     >
                            //       <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
                            //       invite
                            //     </button>
                            //   ) : (
                            //   <div className="py-2 px-4 flex bg-[#1a1a1a] rounded-md pointer-events-none">
                            //     <div className="w-[10px] h-[10px] rounded-full bg-red-400"></div>
                            //     offline
                            //   </div>
                            //   )}
                            // </div>
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
              <div className="mt-4 py-2 px-8 w-full space-y-4">

                <p className="text-center text-2xl">Rating: 400</p>

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
                <p className="text-center">This feature is still under development. Add and Invite a friend to start playing.</p>

                {/* <div>
                  <p>7 wins - first to make 7 wins</p>
                  <p>3 wins - first to make 3 wins</p>
                  <p>1 win - first to win</p>
                </div> */}
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