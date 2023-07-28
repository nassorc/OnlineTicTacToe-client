import { useReducer } from "react";

const USER_ACTIONS = {
  SET_USER: "set_user",
  SET_FRIENDS: "set_friends",
  SET_FRIEND_ONLINE_STATUS: "set_friend_online_status",
  SET_FRIEND_PLAYING_STATUS: "set_friend_playing_status",
  SET_FRIEND_INVITE: "set_friend_invite",
  ADD_FRIEND_REQUEST: "add_friend_request",
  REMOVE_FRIEND_REQUEST: "remove_friend_request"
}

function userReducer(state, actions) {
  switch(actions.type) {
    case USER_ACTIONS.SET_USER:
      return { ...state, user: actions.payload.user };
    case USER_ACTIONS.SET_FRIENDS:
      return {...state, friends: actions.payload.friends};
    case USER_ACTIONS.SET_FRIEND_ONLINE_STATUS:
      return {...state, friends: state.friends.map(friend => {
        if(friend._id === actions.payload.id) {
          return {...friend, online: actions.payload.status};
        }
        return friend;
      })}
    case USER_ACTIONS.SET_FRIEND_PLAYING_STATUS:
      return {...state, friends: state.friends.map(friend => {
        if(friend._id === actions.payload.id) {
          return {...friend, playing: actions.payload.status};
        }
        return friend;
      })}
    case USER_ACTIONS.SET_FRIEND_INVITE:
      return {...state, friendInvites: actions.payload.friendInvites};
    case USER_ACTIONS.ADD_FRIEND_REQUEST:
      return {...state, friendInvites: [...state.friendInvites, actions.payload.request]}
    case USER_ACTIONS.REMOVE_FRIEND_REQUEST:
      return {...state, friendInvites: state.friendInvites.filter(request => request.sender._id !== actions.payload.id)}
    default:
      return state;
  }
}

function useUser() {
  const initialState = {
    user: null,
    friends: [],
    friendInvites: [],
  }
  const [state, dispatch] = useReducer(userReducer, initialState);
  // helper functions
  const setUser = (user) => dispatch({type: USER_ACTIONS.SET_USER, payload: {user}});
  const setFriends = (friends) => dispatch({type: USER_ACTIONS.SET_FRIENDS, payload: {friends}});
  const setFriendOnlineStatus = (id, status) => dispatch({type: USER_ACTIONS.SET_FRIEND_ONLINE_STATUS, payload: {id, status}});
  const setFriendPlayingStatus = (id, status) => dispatch({type: USER_ACTIONS.SET_FRIEND_PLAYING_STATUS, payload: {id, status}});
  const setFriendInvites = (friendInvites) => dispatch({type: USER_ACTIONS.SET_FRIEND_INVITE, payload: {friendInvites}});
  const addNewFriendRequest = (friendRequest) => dispatch({type: USER_ACTIONS.ADD_FRIEND_REQUEST, payload: {request: friendRequest}})
  const removeFriendRequest = (id) => dispatch({type: USER_ACTIONS.REMOVE_FRIEND_REQUEST, payload: {id: id}})

  return {
    user: state.user,
    friends: state.friends,
    friendInvites: state.friendInvites,
    setUser,
    setFriends,
    setFriendOnlineStatus,
    setFriendPlayingStatus,
    setFriendInvites,
    addNewFriendRequest,
    removeFriendRequest
  };
} 

export default useUser;