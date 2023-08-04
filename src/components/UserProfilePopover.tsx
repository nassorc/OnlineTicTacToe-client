import { useState, useEffect } from "react";
import { Icons } from "./Icons";
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

interface PageProps {
  userId: string
  children: React.ReactNode
}

export default function UserProfilePopover(props: PageProps) {
  const { children } = props;
  const [user, setUser] = useState<{
    _id: string
    username: string
    email: string,
    profileImage: string
  }>(undefined);
  const friends = []
  const handleAddFriend = id => {return}
  const handleInvitePlayer = id => {return}

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
        <div className="w-full flex  space-x-3">
          <ProfileImage profileImage={user?.profileImage} size="md"/>
          <div>
            <a href={`/user/${user?.username}`} className="text-site-accent brightness-90">{user?.username}</a>
            <p className="">{user?.email}</p>
          </div>

          <div>

            {(friends?.filter(friend => friend._id === user._id).length === 0) && (
              <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* <Button onClick={() => {handleAddFriend(user._id)}} size="icon" variant="ghost"> */}
                          <Icons.userPlus className="w-[24px] h-[24px] aspect-square cursor-pointer"/>
                        {/* </Button> */}
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
                      {/* <Button onClick={() => {handleInvitePlayer(user._id)}} size="icon" variant="ghost"> */}
                        <Icons.sword className="w-[24px] h-[24px] aspect-square cursor-pointer"/>
                      {/* </Button> */}
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
