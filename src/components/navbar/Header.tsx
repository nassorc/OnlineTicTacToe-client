import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, useAuth, AUTH_ACTIONS } from "../../context/auth";
import { useSocket } from "../../context/socket";
import { Icons } from "../Icons";
import Navbar from "./Navbar";
import NavLink from "./NavLink";
import {
  DropdownMenu, 
  DropdownItem, 
  DropdownHeader 
} from "../dropdown";

export default function Header() {
  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false)
  const settingsDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);

  const authButtons = (authState.userId && authState.accessToken) ? (
    <>
      <button><Icons.bell /></button>
      <button><Icons.settings /></button>
      <button onClick={() => {
        logoutUser(authDispatch as React.Dispatch<AuthActionType>, AUTH_ACTIONS);
        // socket.emit("user:disconnecting");
        socket.disconnect();
        navigate('/signin');
      }}>logout</button>
    </>
  ) : (
    <ul className="flex">
      <li><Link to="/signin">Sign in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
    </ul>
  )

  useEffect(() => {
    function a(e) {
      if(!settingsDropdownRef.current.contains(e.target)) {
        setShowSettings(false);
      }
      if(!notificationsDropdownRef.current.contains(e.target)) {
        setShowNotification(false);
      }

    }
    document.addEventListener("click", a)
    return () => {
      document.removeEventListener("click", a)
    }
  }, [])

  return (
    <header className="fixed top-0 z-[99] w-full bg-base-600 bg-slate-900 h-20 border-b-4 border-base-200 text-white">
      <div className="container mx-auto h-full flex items-center ">
        <div className="flex items-center space-x-2 text-xl font-bold text-white min-w-max">
          <img 
            className="w-[20%] min-h-full block object-contain"
            src="/images/icons48.png" 
            alt="logo image"
          />
          <h2>TTT Online</h2>
        </div>
        <Navbar>
          {/* <NavLink 
            ref={notificationsDropdownRef}
            selected={showNotification}
            onClick={() => {
              // setMenu("notification")
              setShowNotification(!showNotification)
            }}
            icon={<Users2 />}
          >
            <div className="absolute h-2 rounded-full bg-green-400"></div>
            <DropdownMenu show={showNotification}>
              <DropdownHeader>
                Friend Requests
              </DropdownHeader>
              <DropdownItem
                rightIcon={<div className="flex"><Check/><X/></div>}
              >
                <span>UserA</span>
              </DropdownItem>
            </DropdownMenu>
          </NavLink> */}

          <NavLink 
            ref={settingsDropdownRef}
            selected={showSettings}
            icon={<Icons.settings />}
            onClick={() => {
              // setMenu("settings");
              setShowSettings(!showSettings);
            }}
          >
            <DropdownMenu show={showSettings}>
              <DropdownHeader>
                Settings
              </DropdownHeader>
              {/* <DropdownItem
                leftIcon={<User />}
              >
                Profile
              </DropdownItem> */}
              <DropdownItem 
                onClick={(e) => {
                  logoutUser(authDispatch as React.Dispatch<AuthActionType>, AUTH_ACTIONS);
                  socket.disconnect();
                  navigate('/signin');
                }}
                leftIcon={<Icons.logout />}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </NavLink>  
        </Navbar>
        

      </div>

    </header>
  )
}
