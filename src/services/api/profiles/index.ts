import api from '..'
import { IProfile } from '../../../interfaces'

export const getProfile = async (username: string): Promise<IProfile> => {
  return await (
    await api.get(`/profiles/${username}`)
  ).data.profile
}

export const postFollowUser = async (username: string): Promise<IProfile> => {
  return await (
    await api.post(`/profiles/${username}/follow`)
  ).data.profile
}

export const deleteFollowUser = async (username: string): Promise<IProfile> => {
  return await (
    await api.delete(`/profiles/${username}/follow`)
  ).data.profile
}
