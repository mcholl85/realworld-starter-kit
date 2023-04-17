import { createContext, PropsWithChildren, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postLogin, postRegister, putUser } from '../api/users'
import useLocalStorage from '../hooks/use-localstorage'
import { IUser } from '../../interfaces'
import { LoginParams, RegisterParams, UpdateParams } from '../api/users/index.types'
import { USER_KEY } from '../../constants/api.constants'

type UserContextProps = {
  user: IUser
  errors: string[]
  isLogged: boolean
  setLogin: (params: LoginParams) => void
  setRegister: (params: RegisterParams) => void
  updateUser: (params: UpdateParams) => void
  setLogout: () => void
}

const initialUser: IUser = {
  email: '',
  token: '',
  username: '',
  bio: '',
  image: '',
}

const UserContext = createContext({} as UserContextProps)

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [user, setUser] = useLocalStorage<IUser>(USER_KEY, initialUser)

  const isLogged = user.token !== ''

  const setLogin = async (params: LoginParams) => {
    const { errors, user } = await postLogin(params)

    if (user) {
      setUser(user)
      setErrors([])
      navigate('/')
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const setRegister = async (params: RegisterParams) => {
    const { errors, user } = await postRegister(params)

    if (user) {
      setUser(user)
      setErrors([])
      navigate('/')
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const updateUser = async (params: UpdateParams) => {
    const { user } = await putUser(params)

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
