import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postLogin, postRegister, putUser } from '../api/users'
import { User } from '../api/users/index.type'
import useLocalStorage from './use-localstorage'

export type updateUser = {
  data: User & { password: string }
}

function useAuth() {
  const initialUser: User = {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  }
  const [user, setUser] = useLocalStorage<User>('user', initialUser)
  const [errors, setErrors] = useState([] as Array<string>)
  const navigate = useNavigate()

  const isLogged = user.token !== ''

  const setLogin = async (data: { email: string; password: string }) => {
    const { errors, user } = await postLogin(data)

    if (user) {
      setUser(user)
      setErrors([])
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const setRegister = async (data: { email: string; username: string; password: string }) => {
    const { errors, user } = await postRegister(data)

    if (user) {
      setUser(user)
      setErrors([])
    }

    if (errors) setErrors(parseErrors(errors))
  }

  const updateUser = async ({ data }: updateUser) => {
    const { user } = await putUser(data)

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
