import React, { useEffect, useState } from "react"
import { useSocket } from "../../context/socket";
import { useAuth } from "../../context/auth/context";
import Cell from "../../components/game/Cell";

export interface gameType {
  roomId: string,
  userA: {
    userId: string,
    ready: boolean,
  },
  userB: {
    userId: string,
    ready: boolean,
  },
  playerX: string,
  playerO: string,
  round: number,
  history: Array<Array<string>>
  currentPlayer: string,
}
export default function Game() {
  const [authState, authDispatch] = useAuth();
  const { socket } = useSocket();
  const [board, setBoard] = useState<string[]>([]);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<{winner: string, tiles: number[]}>();
  const [isGameReady, setIsGameReady] = useState(false);
  const [gameInfo, setGameInfo] = useState<gameType>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    function gameStart(gameInfo: gameType) {
      if(!gameInfo) {
        setErrorMsg('Could not start game. Missing initial game info.');
        return;
      }
      setGameInfo(gameInfo);
      setBoard(gameInfo.history[gameInfo.history.length - 1]);
      setIsGameReady(true);
    }
    function onPlayerMove(gameInfo: gameType) {
      if(!gameInfo) {
        setErrorMsg('Could not start game. Missing initial game info.');
        return;
      }
      setBoard(gameInfo.history[gameInfo.history.length - 1]);
      setGameInfo(gameInfo);
    }
    function onWinner(winner: {winner: string, tiles: number[]}) {
      console.log(winner);
      setWinner(winner);
    }
    socket.emit("game:connected", () => ({roomId: localStorage.getItem('roomId')}));
    socket.on('game:start', gameStart);
    socket.on('game:playerMove', onPlayerMove);
    socket.on('game:winner', onWinner);
    return () => {
      socket.disconnect();
      socket.off('game:start', gameStart);
      socket.off('game:playerMove', onPlayerMove);
      socket.off('game:winner', onWinner);
    }
  }, [socket]);

  const handleClick = (idx: number) => {
    // create copy of board
    const nextBoard = board.slice();
    // if cell is NOT empty or userId is NOT the current player return or game is finished
    if(nextBoard[idx] || gameInfo?.currentPlayer != (authState as any).userId || winner) return;
    socket.emit('game:playerMove', idx);
    setXIsNext(!xIsNext);
  }
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
  const crossWinningTiles = (winner && winner.tiles) ? winningLines[winner?.tiles.join('')] : null;
  console.log(crossWinningTiles);
  return(
    <div className="pt-20 mx-auto max-w-3xl flex flex-col justify-center items-center">
      {(gameInfo?.playerX == (authState as any).userId) ? <p>You are player X</p> : <p>You are player O</p>}
      {errorMsg && <p className="text-red-400">{errorMsg}</p>}
      {isGameReady ? 
        <div className="relative">
          {(crossWinningTiles && crossWinningTiles)}
          {/* <div className={`absolute top-[16%] w-full h-[4px] bg-red-400`}></div>
          <div className={`absolute top-[50%] w-full h-[4px] bg-red-400`}></div>
          <div className={`absolute top-[82%] w-full h-[4px] bg-red-400`}></div>
          <div className={`absolute left-[16%] w-[4px] h-full bg-red-400`}></div>
          <div className={`absolute left-[50%] w-[4px] h-full bg-red-400`}></div>
          <div className={`absolute left-[82%] w-[4px] h-full bg-red-400`}></div>
          <div className={`absolute left-[50%] w-[4px] h-full rotate-45 bg-red-400`}></div>
          <div className={`absolute left-[50%] w-[4px] h-full -rotate-45 bg-red-400`}></div> */}
          
          <div className="flex">
            <Cell value={board[0]} handleClick={() => handleClick(0)}/>
            <Cell value={board[1]} handleClick={() => handleClick(1)}/>
            <Cell value={board[2]} handleClick={() => handleClick(2)}/>
          </div>
          <div className="flex">
            <Cell value={board[3]} handleClick={() => handleClick(3)}/>
            <Cell value={board[4]} handleClick={() => handleClick(4)}/>
            <Cell value={board[5]} handleClick={() => handleClick(5)}/>
          </div>
          <div className="flex">
            <Cell value={board[6]} handleClick={() => handleClick(6)}/>
            <Cell value={board[7]} handleClick={() => handleClick(7)}/>
            <Cell value={board[8]} handleClick={() => handleClick(8)}/>
          </div>
        </div> :
        <p>Loading...</p>
      }
    </div>
  )
}