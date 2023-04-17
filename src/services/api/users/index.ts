import api from '..'
import { LoginParams, RegisterParams, UpdateParams } from './index.types'
import { IUserResponse } from '../../../interfaces'

export const postLogin = async ({ email, password }: LoginParams): Promise<IUserResponse> => {
  return (await api.post('/users/login', { user: { email, password } })).data
}

export const postRegister = async ({
  email,
  username,
  password,
}: RegisterParams): Promise<IUserResponse> => {
  return (await api.post('/users', { user: { email, username, password } })).data
}

export const putUser = async (data: UpdateParams): Promise<IUserResponse> => {
  return (await api.put('/user', { user: data })).data
}
