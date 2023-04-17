import { createContext, PropsWithChildren, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postLogin, postRegister, putUser } from '../api/users'
import { User } from '../api/users/index.types'
import useLocalStorage from '../hooks/use-localstorage'

type UserContextProviderProps = PropsWithChildren
type UserContextProps = {
  user: User
  errors: string[]
  isLogged: boolean
  setLogin: (data: { email: string; password: string }) => void
  setRegister: (data: { email: string; username: string; password: string }) => void
  updateUser: (data: {
    email: string
    username: string
    bio: string
    password: string
    image: string
  }) => void
  setLogout: () => void
}

const initialUser: User = {
  email: '',
  token: '',
  username: '',
  bio: '',
  image: '',
}

const UserContext = createContext({} as UserContextProps)

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState([] as Array<string>)
  const [user, setUser] = useLocalStorage<User>('user', initialUser)

  const isLogged = user.token !== ''

  const setLogin = async (data: { email: string; password: string }) => {
    const { errors, user } = await postLogin(data)

    if (user) {
      setUser(user)
      setErrors([])
      navigate('/')
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const setRegister = async (data: { email: string; username: string; password: string }) => {
    const { errors, user } = await postRegister(data)

    if (user) {
      setUser(user)
      setErrors([])
      navigate('/')
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const updateUser = async (data: {
    email: string
    username: string
    bio: string
    password: string
    image: string
  }) => {
    const { user } = await putUser(data)

    if (user) {
      setUser(user)
      navigate(`/${user.username}/`)
    }
  }

  const setLogout = () => {
    setUser(initialUser)
  }

  return (
    <UserContext.Provider
      value={{ user, errors, isLogged, setLogin, setRegister, updateUser, setLogout }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
