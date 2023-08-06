import Cell from "../../components/game/Cell";

interface PropsType extends React.HTMLProps<HTMLDivElement> {
  size?: number
  board: string
  winner: {
    winner: string
    winningTiles: number[]
  }
  onBoardClick?: (arg: number) => void
}

export default function Board({ size, board, winner, onBoardClick, ...divProps }: PropsType) {
  const winningLines = {
    "012": <div className={`absolute top-[16%] w-full h-[4px] bg-red-400`}></div>,
    "345": <div className={`absolute top-[50%] w-full h-[4px] bg-red-400`}></div>,
    "678": <div className={`absolute top-[82%] w-full h-[4px] bg-red-400`}></div>,
    "036": <div className={`absolute left-[16%] w-[4px] h-full bg-red-400`}></div>,
    "147": <div className={`absolute left-[50%] w-[4px] h-full bg-red-400`}></div>,
    "258": <div className={`absolute left-[82%] w-[4px] h-full bg-red-400`}></div>,
    "048": <div className={`absolute left-[50%] w-[4px] h-full -rotate-45 bg-red-400`}></div>,
    "246": <div className={`absolute left-[50%] w-[4px] h-full rotate-45 bg-red-400`}></div>,
  }
  const crossWinningTiles = (winner && winner.winningTiles) ? winningLines[winner?.winningTiles.join('')] : null;
  return (
    <div 
      className={`relative min-w-[180px] min-h-[180px] grid grid-cols-3 grid-rows-3 gap-1 text-white`}
      style={{
        width: size + "px",
        height: size + "px"
      }}
      {...divProps}
    >
      {(crossWinningTiles && crossWinningTiles)}
      <Cell value={board[0]} handleClick={() => onBoardClick(0)}/>
      <Cell value={board[1]} handleClick={() => onBoardClick(1)}/>
      <Cell value={board[2]} handleClick={() => onBoardClick(2)}/>
      <Cell value={board[3]} handleClick={() => onBoardClick(3)}/>
      <Cell value={board[4]} handleClick={() => onBoardClick(4)}/>
      <Cell value={board[5]} handleClick={() => onBoardClick(5)}/>
      <Cell value={board[6]} handleClick={() => onBoardClick(6)}/>
      <Cell value={board[7]} handleClick={() => onBoardClick(7)}/>
      <Cell value={board[8]} handleClick={() => onBoardClick(8)}/>
    </div> 
  )
}
