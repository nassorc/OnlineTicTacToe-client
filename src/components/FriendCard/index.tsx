import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import UserProfilePopover from "../UserProfilePopover"
import ProfileImage from "../ProfileImage"
interface PropsType {
  id: string
  username: string
  online: boolean
  playing: boolean
  profileImage: string
  disabled?: boolean
  inviteFriend: (id: string) => void
}

export function FriendCard(props: PropsType) {
  const { id, username, online, playing, inviteFriend, profileImage, disabled } = props;
  
  const handleInviteFriend = () => {
    console.log("inviting")
    inviteFriend(id);
  }

  return (
    <div key={id} className="mx-auto py-1 px-3 flex border-t-2 last:border-b-2 justify-between border-[#ebebeb] text-[#0b132b]">
      <div className="flex items-center gap-x-2">
        <UserProfilePopover userId={id}>
          <div className="flex items-center space-x-2">
            <ProfileImage profileImage={profileImage} size="sm"/>
            <p className="font-bold">{username}</p>
          </div>
        </UserProfilePopover>
        <div className="min-w-content min-h-content">
          <div className={`w-3 h-3 inline-block rounded-full ${(online) ? "bg-green-400" : "bg-red-400"}`}>
          </div>
          <span className={`hidden mx-2 lg:inline ${(online) ? "text-green-400" : "text-red-400"}`}>
            {(online) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <p className="">playing</p> */}
        {(playing) && <p className="text-[#898989]">playing</p>}
        <Button
          size="sm"
          onClick={handleInviteFriend}
          disabled={!online ||disabled}
        >
          Invite
        </Button>
        
        {/* <button 
          onClick={handleInviteFriend}
          className="box-border flex disabled:opacity-30"
          disabled={!online ||disabled}>
          invite
        </button> */}
      </div>
    </div>
  )
}
