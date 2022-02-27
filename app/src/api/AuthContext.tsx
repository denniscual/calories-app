import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { SigninDataResponse } from './auth.service'

export interface LoggedUserType {
  id: string
  roles: string[]
  fullName: string
}

type AuthContextType = [
  LoggedUserType,
  Dispatch<SetStateAction<LoggedUserType>>
]

const initLoggedUser: LoggedUserType = {
  id: '',
  roles: [],
  fullName: '',
}
export const AuthContext = createContext<AuthContextType>([
  initLoggedUser,
  () => {},
])

export const AuthContextProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const loggedUser = localStorage.getItem('user')
    return loggedUser ? JSON.parse(loggedUser) : initLoggedUser
  })
  const value = useMemo(() => [auth, setAuth] as AuthContextType, [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useLoginUser() {
  const [, setAuth] = useAuth()
  const navigate = useNavigate()

  return function login({ accessToken, ...loggedUser }: SigninDataResponse) {
    try {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...loggedUser,
          accessToken,
        })
      )
      setAuth(loggedUser)

      navigate('/', {
        replace: true,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export function useLogoutUser() {
  const navigate = useNavigate()
  const [, setAuth] = useAuth()

  return function logout() {
    setAuth(initLoggedUser)
    // Remote the token.
    localStorage.removeItem('user')
    navigate('/')
  }
}

function useAuth() {
  return useContext(AuthContext)
}

export function useLoggedUser() {
  return useAuth()[0]
}

export function hasUser({ id }: LoggedUserType) {
  return id !== ''
}

export function isAdmin({ roles }: LoggedUserType) {
  return roles.includes('ROLE_ADMIN')
}
