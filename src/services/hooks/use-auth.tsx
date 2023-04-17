import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postLogin, postRegister, putUser } from '../api/users'
import { IUser } from '../../interfaces'
import useLocalStorage from './use-localstorage'
import { LoginParams, RegisterParams, UpdateParams } from '../api/users/index.types'

function useAuth() {
  const initialUser: IUser = {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  }
  const [user, setUser] = useLocalStorage<IUser>('user', initialUser)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const isLogged = user.token !== ''

  const setLogin = async (params: LoginParams) => {
    const { errors, user } = await postLogin(params)

    if (user) {
      setUser(user)
      setErrors([])
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const setRegister = async (params: RegisterParams) => {
    const { errors, user } = await postRegister(params)

    if (user) {
      setUser(user)
      setErrors([])
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const updateUser = async (params: UpdateParams) => {
    const { user } = await putUser(params)

    if (user) {
      setUser(user)
      navigate(`/${user.username}`)
    }
  }

  const setLogout = () => {
    setUser(initialUser)
    navigate('/')
  }

  return { user, errors, isLogged, setLogin, setRegister, updateUser, setLogout }
}

export default useAuth
