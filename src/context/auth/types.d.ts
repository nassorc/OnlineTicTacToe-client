interface AuthStateType {
  userId: string,
  accessToken: string,
  loading: boolean,
  error?: string | null,
}
interface AuthActionType {
  type: string,
  payload?: {
    userId?: string,
    accessToken?: string,
    error?: string
  }
}