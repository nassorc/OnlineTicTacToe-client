const eventHandler = (action) => (data) => {
  action(data);
}
export const events = [
  {
    name: "user:invited",
    type: "on",
    payload: function(action, handleUserAcceptGameInvite, handleUserRejectGameInvite) {
      return (data) => {
        action(data.from.userId, data.from.username, data.roomId, handleUserAcceptGameInvite, handleUserRejectGameInvite);
      }
    }
  },
]
  // {
  //   name: "friend:connected",
  //   type: "on",
  //   payload: function()
  // },
  // {
  //   name: "friend:disconnected",
  //   type: "on",
  //   payload: eventHandler
  // }