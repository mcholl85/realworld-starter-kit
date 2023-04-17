import api from '..'
import { IComment } from '../../../interfaces'
import { deleteCommentParams, postCommentParams } from './index.types'

export const getComments = async (slug: string): Promise<IComment[]> => {
  return await (
    await api.get(`/articles/${slug}/comments`)
  ).data.comments
}

export const postComment = async ({ slug, form }: postCommentParams): Promise<IComment> => {
  return await (
    await api.post(`/articles/${slug}/comments`, { comment: form })
  ).data.comment
}

export const deleteComment = async ({ slug, id }: deleteCommentParams) => {
  await api.delete(`/articles/${slug}/comments/${id}`)
}
