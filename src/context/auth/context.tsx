import { createContext, useReducer, useContext} from "react";

const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : "";
const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : ""

const initialValue: AuthStateType = {
    userId: userId || "",
    accessToken: accessToken || "",
    loading: false,
    error: null
}

const AuthStateContext = createContext<AuthStateType>(initialValue);
const AuthDispatchContext = createContext<React.Dispatch<AuthActionType>>(() => {return});

export const useAuth  = (): [AuthStateType, React.Dispatch<AuthActionType>] => {
    const authState = useContext<AuthStateType>(AuthStateContext);
    const authDispatch = useContext<React.Dispatch<AuthActionType>>(AuthDispatchContext);
    // if(!authState || !authDispatch) throw new Error("useAuth must be consumed by child in AuthProvider");
    return [authState, authDispatch];
}

export const AUTH_ACTIONS = {
    REQUEST_LOGIN: "login_request",
    LOGIN_SUCCESS: "login_success",
    LOGIN_ERROR: "login_error",
    LOGOUT: "logout"
}



function reducer(state: AuthStateType, action: AuthActionType) {
    switch(action.type) {
        case AUTH_ACTIONS.REQUEST_LOGIN:
            return {...state, loading: true};
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {...state, loading: false, error: null, userId: action?.payload?.userId, accessToken: action?.payload?.accessToken};
        case AUTH_ACTIONS.LOGIN_ERROR:
            return {...state, loading: false, error: action?.payload?.error};
        case AUTH_ACTIONS.LOGOUT:
            return {...state, userId: "", accessToken: ""};
        default:
            return state;
    }
}

export function AuthProvider({children}: {children: React.ReactElement}) {
    const [authState, dispatch] = useReducer(reducer, initialValue);
    return (
        <AuthStateContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}