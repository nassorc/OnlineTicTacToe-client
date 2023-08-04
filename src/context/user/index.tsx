import { 
  useState, 
  createContext, 
  useContext,
  Dispatch,
  SetStateAction,
  useEffect
} from "react";
import { useAuth } from "../auth";

interface User {
    _id: string
    username: string
    email: string
    profileImage: string
    friends: []
}
interface UserContextType {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}
const UserContext = createContext<Partial<UserContextType>>({});

function useUser2(userId) {
  const userCtx = useContext(UserContext);
  if(!userCtx) throw new Error("useUser must be called within a UserProvider");

  // useEffect(() => {
  //   (async function() {
  //     const res = await fetch(`http://localhost:3000/api/user/${userId}/profile`, {
  //       credentials: "include"
  //     });
  //     const data = await res.json();
  //     userCtx.setUser({
  //       _id: data._id,
  //       username: data.username,
  //       email: data.email,
  //       friends: data.friends,
  //       profileImage: data.profileImage
  //     })

  //   })();
  // }, [userId]);

  return userCtx.user;
}

function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<Partial<User>>({});
  const [authState, _] = useAuth();
  const userId = authState.userId;

  useEffect(() => {
    (async function() {
      const res = await fetch(`http://localhost:3000/api/user/${userId}/profile`, {
        credentials: "include"
      });
      const data = await res.json();
      setUser({
        _id: data._id,
        username: data.username,
        email: data.email,
        friends: data.friends,
        profileImage: data.profileImage
      })

    })();
  }, [userId]);
  return (
    <UserContext.Provider value={{user: (user as User), setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
export {
  useUser2,
  UserProvider
}