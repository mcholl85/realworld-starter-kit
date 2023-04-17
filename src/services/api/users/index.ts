import api from '..'
import { LoginInputs, RegisterInputs, UpdateInputs, UserResponse } from './index.types'

export const postLogin = async ({ email, password }: LoginInputs): Promise<UserResponse> => {
  return (await api.post('/users/login', { user: { email, password } })).data
}

export const postRegister = async ({
  email,
  username,
  password,
}: RegisterInputs): Promise<UserResponse> => {
  return (await api.post('/users', { user: { email, username, password } })).data
}

export const putUser = async (data: UpdateInputs): Promise<UserResponse> => {
  return (await api.put('/user', { user: data })).data
}
