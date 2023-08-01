import { AuthProvider } from "../context/auth"
import { SocketProvider } from "../context/socket"

interface ContextProviderProps {
  children: JSX.Element
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <SocketProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </SocketProvider>
  )
}
