import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postLogin, postRegister, putUser } from '../api/users'
import { LoginParams, RegisterParams, UpdateParams } from '../api/users/index.types'
import { UserContext } from '../contexts/UserContextProvider'

function useAuth() {
  const { user, setUser, resetUser, isLogged } = useContext(UserContext)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

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
      navigate(`/user/${user.username}`)
    }
  }

  const setLogout = () => {
    resetUser()
  }

  return { user, errors, isLogged, setLogin, setRegister, updateUser, setLogout }
}

export default useAuth
