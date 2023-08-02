
interface playerType {
    userId: string,
    username: string,
}

interface invitationStateType {
  roomId: string,
  from: playerType,
  to: playerType,
}    