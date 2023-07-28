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
      <div className="flex">
        <div className="bg-[darkseagreen] w-12 h-12 rounded-sm"></div>
        <span className="flex flex-col">
          <span>{username}</span>
          <span>
            <span>Player</span>
            <span>{move}</span>
          </span>
        </span>
      </div>
      <div className="flex-grow md:flex-grow-0 flex justify-center">
        <span>wins:</span>
        <span>{wins}</span>
        <span>/</span>
        <span>{maxWins}</span>
      </div>
    </div>
  )
}
