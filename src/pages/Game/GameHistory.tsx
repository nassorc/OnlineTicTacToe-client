import NewBoard from "./NewBoard";

interface PropsType {
  boards: any
}

export default function GameHistory(props: PropsType) {
  const {boards} = props;
  console.log(boards)
  return (
    <div className="[&>*]:my-4">
      {boards.winner === "draw" && <p>DRAW</p>}
      {boards.map((board, idx) => <NewBoard key={idx} board={board.gameBoard} winner={{winner: "X", winningTiles: board.winningTiles}} />)}
    </div>
  )
}
