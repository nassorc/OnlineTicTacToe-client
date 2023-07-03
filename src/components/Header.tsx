import { Link, useNavigate } from "react-router-dom";
import { logoutUser, useAuth, AUTH_ACTIONS } from "../context/auth";
import { AuthActionType } from "../context/auth/context";

export default function Header() {
  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();

  const authButtons = (authState.userId && authState.accessToken) ? (
    <button onClick={() => {
      logoutUser(authDispatch as React.Dispatch<AuthActionType>, AUTH_ACTIONS);
      navigate('/signin');
    }}>logout</button>
  ) : (
    <ul className="flex">
      <li><Link to="/signin">Sign in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
    </ul>
  )
  return (
    <header className="fixed top-0 w-full mb-10 bg-[#1a1a1a] h-20">
      <nav className="container h-full mx-auto flex justify-between items-center">
        <div>TTT Online</div>
        {authButtons}
      </nav>
    </header>
  )
}
