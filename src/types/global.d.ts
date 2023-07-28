interface globalMe {
  name: string
}
type SocketEventType = {
  name: string
} & ( SocketOnEvent | SocketEmitEvent );

type SocketOnEvent = {
  type: "on",
  action: (...args: unknown[]) => void 
}
type SocketEmitEvent = {
  type: "emit",
  payload: any
}