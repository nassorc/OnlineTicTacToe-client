interface PropsType {
  id: string
  username: string
  online: boolean
  playing: boolean
  inviteFriend: (id: string) => void
}

export function FriendCard(props: PropsType) {
  const { id, username, online, playing, inviteFriend } = props;
  
  const handleInviteFriend = () => {
    console.log("inviting")
    inviteFriend(id);
  }

  return (
    <div key={id} className="mx-auto my-2 py-2 px-3 flex border justify-between border-base-100 rounded-md">
      <div className="flex items-center gap-x-2">
        <p className="text-white font-bold">{username}</p>
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
        
        <button onClick={handleInviteFriend} className="box-border flex bg-base-600" disabled={!online}>
          invite
        </button>
      </div>
    </div>
  )
}
