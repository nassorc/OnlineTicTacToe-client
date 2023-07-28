import React from "react"
import { AuthActionType, AUTH_ACTIONS } from "./context"
import * as Constants from "../../config/constants";
import { useSocket } from "../socket";

export async function signInUser(dispatch: React.Dispatch<AuthActionType>, actions: typeof AUTH_ACTIONS, payload: {email: string, password: string}) {
    try {
      dispatch({type: actions.REQUEST_LOGIN})
      const res = await fetch(Constants.SIGNINURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const credentials = await res.json();
      const {accessToken, userId} = credentials.user;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      dispatch({type: actions.LOGIN_SUCCESS, payload: {userId, accessToken}});
      return credentials;
    }
    catch(error: any) {
      dispatch({type: actions.LOGIN_ERROR, payload: {error: "Invalid email or password"}});
      return;
    }
}

export async function signUpUser(payload: {email: string, password: string}) {
  try {
    const user = await fetch(Constants.SIGNUPURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    return user;
  } catch(error: any) {
    throw new Error('Email already exists');
  }
}

export function logoutUser(dispatch: React.Dispatch<AuthActionType>, actions: typeof AUTH_ACTIONS) {
  dispatch({type: actions.LOGOUT});
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
}