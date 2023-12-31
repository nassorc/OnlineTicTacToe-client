import { Navigate, Outlet } from "react-router-dom";
import { useAuth, AuthStateType } from "../context/auth/context";

export default function RequireUser() {
    const [authState, _] = useAuth();
    return ((authState as AuthStateType)?.userId && (authState as AuthStateType)?.accessToken) 
      ? <Outlet /> 
      : <Navigate to="/signin" replace/>;
} 