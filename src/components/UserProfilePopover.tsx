import { useState, useEffect } from "react";
import { Icons } from "./Icons";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ProfileImage from "./ProfileImage";
import { useSocket } from "@/context/socket";

interface PageProps {
  userId: string
  children: React.ReactNode
}

export default function UserProfilePopover(props: PageProps) {
  const { socket } = useSocket();
  const { children } = props;
  const [user, setUser] = useState<{
    _id: string
    username: string
    email: string,
    profileImage: string
  }>(undefined);
  const friends = []

  const handleInvitePlayer = (playerId: string) => {
    toast.success("Game invite sent")
    socket.emit("user:invitePlayer", {playerId: playerId});
  }

  useEffect(() => {
    // fetch user information
    async function getUserProfile(id: string) {
      const res = await fetch(`http://localhost:3000/api/user/${id}/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      return data;
    }
    getUserProfile(props.userId)
      .then(profile => {
        setUser(profile);
      })
  }, []);


  const handleAddFriend = (userId: string) => {
    socket.emit("user:addFriend", {friendId: userId})
  }

  return (
    <>
    {true &&  
    <Popover>
      <a href={`/user/${user?.username}`} onClick={(e) => {e.preventDefault(); return}} >
        <PopoverTrigger>
          {children}
        </PopoverTrigger>
      </a>
      <PopoverContent className="w-[340px]">
        <div className="w-full flex justify-between">
          <div className="flex space-x-3">
            <ProfileImage profileImage={user?.profileImage} size="md"/>
            <div>
              <a href={`/user/${user?.username}`} className="text-site-accent brightness-90">{user?.username}</a>
              <p className="">{user?.email}</p>
            </div>
          </div>

          <div className="flex space-x-3 items-center">
            {(friends?.filter(friend => friend._id === user._id).length === 0) && (
              <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <Icons.userPlus 
                            className="w-[24px] h-[24px] aspect-square cursor-pointer hover:text-[#9a9a9a]"
                            onClick={() => handleAddFriend(user?._id)}
                          />
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
                        <Icons.sword 
                          className="w-[24px] h-[24px] aspect-square cursor-pointer hover:text-[#9a9a9a]"
                          onClick={() => handleInvitePlayer(user?._id)}
                        />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Challenge</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        </div>
      </PopoverContent>
    </Popover>
    }
</>
  )
}
