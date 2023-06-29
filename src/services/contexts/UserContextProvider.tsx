import { createContext, PropsWithChildren } from 'react'
import useLocalStorage from '../hooks/use-localstorage'
import { IUser } from '../../interfaces'
import { USER_KEY } from '../../constants/api.constants'

type UserContextProps = {
  user: IUser
  isLogged: boolean
  setUser: (user: IUser) => void
  resetUser: () => void
}

const UserContext = createContext({} as UserContextProps)

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const initialUser: IUser = {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  }
  const [user, setUser] = useLocalStorage<IUser>(USER_KEY, initialUser)
  const isLogged = user.token !== ''
  const resetUser = () => setUser(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
