export const socketEvents: SocketEventType[] = [
  {
    name: "on:test",
    type: "on",
    action: function(data) {
      console.log(data);
    }
  },
  {
    name: "emit:test",
    type: "emit",
    payload: "Here some data"
  }
]