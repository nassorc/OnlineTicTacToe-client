import { ACCEPTFRIENDREQUESTURL, ADDFRIENDURL, GETFRIENDSURL, GETUSERURL, REJECTFRIENDREQUESTURL } from "../config/constants";

export async function getUser(userId: string) {
  try {
    const res = await fetch(GETUSERURL + "/" + userId, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return await res.json();
  }
  catch(error: any) {
    console.log(error.message);
  }
}

export async function addFriend(userId: string) {
  console.log("adding", userId)
  try {
    await fetch(ADDFRIENDURL + "/" + userId, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  catch(error: any) {
    console.log(error.message);
  }
}

export async function acceptFriendRequest(userId: string) {
  try {
    await fetch(ACCEPTFRIENDREQUESTURL + "/" + userId, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  catch(error: any) {
    console.log(error.message);
  }
}

export async function rejectFriendRequest(userId: string) {
  try {
    await fetch(REJECTFRIENDREQUESTURL + "/" + userId, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  catch(error: any) {
    console.log(error.message);
  }
}

export async function getFriends() {
  try {
    const res = await fetch(GETFRIENDSURL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    return data.friends;
  }
  catch(error: any) {
    console.log(error.message);
  }
}