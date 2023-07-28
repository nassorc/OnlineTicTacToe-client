import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/socket";
import NewBoard from "./NewBoard";
import { useAuth } from "../../context/auth";
import PlayerInfo from "./PlayerInfo";
import GameHistory from "./GameHistory";
import WinnerBanner from "./WinnerBanner";

export default function NewGame() {
  const { socket } = useSocket();
  const [authState]  = useAuth();
  const [game, setGame] = useState<GameType>();
  const [isGameReady, setIsGameReady] = useState(false);
  const userId = authState.userId;
  const boardRef = useRef();
  const [boardSize, setBoardSize] = useState(0);

  console.log(game);

  const[playerUser, setPlayerUser] = useState<PlayerType>();
  const[playerOpponent, setPlayerOpponent] = useState<PlayerType>();

  // onConnection - connect to game
  useEffect(() => {
    socket.emit("game:connected", {
      roomId: localStorage.getItem('roomId')
    });
  }, [socket]);

  // game mechanics
  useEffect(() => {
    /**
     * Socket Event listener. Triggered if both users are ready and receives intial game data
     * @param message 
     */
    function gameStart(message: GameType) {
      setGame(message);
      // set opponent and user data. Used for player information component
      if(message.userA.userId === userId) {
        setPlayerUser(message.userA)
        setPlayerOpponent(message.userB);
      }
      else  {
        setPlayerUser(message.userB)
        setPlayerOpponent(message.userA);
      }
      setIsGameReady(true);
    }
    /**
     * Socket Event listener. Triggered when a player makes a move.
     * Function receives the updated game state
     * @param message 
     */
    function onPlayerMove(message) {
      setGame(message);
      // set opponent and user data. Used for player information component
      if(message.userA.userId === userId) {
        setPlayerUser(message.userA)
        setPlayerOpponent(message.userB);
      }
      else  {
        setPlayerUser(message.userB)
        setPlayerOpponent(message.userA);
      }
    }
    socket.on("game:start", gameStart);
    socket.on("game:playerMove", onPlayerMove);

    return () => {
      socket.off('game:start', gameStart);
      socket.off("game:playerMove", onPlayerMove);
    }
  }, [socket]);

  // computed board style size
  useEffect(() => {
    // catches css units such as px, rem, em
    const cssUnit = /(\d+)(px|rem|em)$/
    /**
     * Function converts css unit to pixels of type Number
     * @param match 
     * @param number 
     * @param unit 
     * @returns 
     */
    function replacer(match: string, number: string, unit: string) {
      if(unit.toUpperCase() === "REM" || unit.toUpperCase() === "EM") {
        // convert rem to pixels
        number = (Number(number) * 16).toString();
      }
      return number;
    }

    function handleResize() {
      if(!boardRef.current) return;
      const parentHeight = (boardRef as any).current.clientHeight;
      // const parentWidth = boardRef.current.clientWidth;
      const parentWidth = window
        .getComputedStyle(boardRef.current)
        .getPropertyValue('width')
        .replace(cssUnit, replacer);
      const parentPaddingX = window
        .getComputedStyle(boardRef.current)
        .getPropertyValue("padding-left")
        .replace(cssUnit, replacer)
      const size = Math.min(Number(parentWidth), parentHeight);
      setBoardSize(size - Number(parentPaddingX) * 2);
    }
    if(boardRef.current) handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [boardRef]);

  const handleBoardClick = (boardIdx: number) => {
    // create copy of round and board to avoid direct mutations
    const currentRound = Object.assign({}, game.rounds.at(-1));
    const currentBoard = currentRound.gameBoard.slice();  // current game board
    const currentPlayer = (((currentBoard.length-1) % 2 === 0)
      ? currentRound.playerX
      : currentRound.playerO)
      === userId;
    // return if non valid move
    if(
      currentBoard.at(-1).at(boardIdx).toUpperCase() !== "N" 
      || !currentPlayer 
      || currentRound.roundWinner
    ) {
      console.log("returning")
      return;
    }

    // add player's move at index
    const move = currentBoard.at(-1).split("");
    move[boardIdx] = (currentRound.playerX === userId) ? "X" : "O";

    // send socket event that player made valid move
    socket.emit("game:playerMove", { roundId: game.gameId, board: move.join("")});
  }

  // last board
  // winner, tiles
  const a = game?.rounds
    .map(round => {
      return {
        ...round, 
        gameBoard: round.gameBoard.slice(-1)[0]
      }
    })
    .slice(0, -1)
    .reverse();
    console.log(a)

  // filter all past games, then create an array of the last move of all past boards
  const pastCompleteGames = game?.rounds
    .map(round => round.gameBoard)
    .slice(0, -1)
    .map(board => board.slice(-1)[0])
    .reverse();
  
  return (
    <div className="w-full min-h-content flex flex-col items-center">
      { game?.gameWinner && <WinnerBanner playerName={game?.gameWinner}/> }
      { isGameReady ? 
        <div 
          ref={boardRef}
          className="
            px-8 mx-auto my-8 h-content w-[100%] md:w-[60%] lg:w-[40%]
            xl:w-[35%] 2xl:w-[30%] flex flex-col items-center
          "
        >
          {playerOpponent && 
            <PlayerInfo 
              size={boardSize}
              username={playerOpponent.username}
              wins={playerOpponent.wins} 
              maxWins={game.maxWins}
              move={(playerOpponent.userId === game.rounds.at(-1).playerX) ? "X" : "O"}
          />}
          
          <NewBoard 
            size={boardSize}
            board={game?.rounds[game?.rounds.length - 1].gameBoard.at(-1)}
            winner={{winner: game?.rounds.at(-1).roundWinner, winningTiles: game?.rounds.at(-1).winningTiles}}
            onBoardClick={handleBoardClick}
          />
          {playerUser && 
            <PlayerInfo 
              size={boardSize}
              username={playerUser.username}
              wins={playerUser.wins} 
              maxWins={game.maxWins}
              move={(playerUser.userId === game.rounds.at(-1).playerX) ? "X" : "O"}
          />}
        </div> :
        <p>Loading...</p>
      }
      {a && <GameHistory boards={a}/> }
    </div>
  )
}