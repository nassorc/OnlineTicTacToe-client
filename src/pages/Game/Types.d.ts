interface PlayerType {
  userId: string
  username: string
  ready: boolean
  online: boolean
  wins: number
}
interface Round {
  gameBoard: string[]
  playerO: string
  playerX: string
  roundWinner: string
  winningTiles: number[]
}
interface GameType {
  gameId: string
  userA: PlayerType
  userB: PlayerType
  rounds: Round[]
  gameWinner: string
  maxWins: number
}
