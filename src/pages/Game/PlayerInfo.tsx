import { Icons } from "@/components/Icons"

interface PropsType {
  size: number
  username: string
  wins: number
  maxWins: number
  move: string
}
export default function PlayerInfo(props: PropsType) {
  const { size, username, wins, maxWins, move } = props;
  return (
    <div
      className="py-2 w-full flex md:justify-between items-center"
      style={{
        width: size + "px",
      }}
    >
      <div className="flex space-x-2">
        <div className="flex justify-center items-end bg-[slateblue] w-12 h-12 rounded-sm overflow-hidden">
          <Icons.user className="relative top-2 text-black" size={48}/>
        </div>
        <span className="flex flex-col">
          <span className="font-bold">{username}</span>
          <span>
            <span>Player </span>
            <span className="">{move}</span>
          </span>
        </span>
      </div>
      <div 
        className="flex justify-center text-xl space-x-1"
      >
        <span>Wins:</span>
        <span>{wins}</span>
        <span>/</span>
        <span>{maxWins}</span>
      </div>
    </div>
  )
}
