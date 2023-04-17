import api from '..'
import { IComment } from '../../../interfaces'
import { deleteCommentInputs, postCommentInputs } from './index.types'

export const getComments = async (slug: string): Promise<IComment[]> => {
  return await (
    await api.get(`/articles/${slug}/comments`)
  ).data.comments
}

export const postComment = async ({ slug, form }: postCommentInputs): Promise<IComment> => {
  return await (
    await api.post(`/articles/${slug}/comments`, { comment: form })
  ).data.comment
}

export const deleteComment = async ({ slug, id }: deleteCommentInputs) => {
  await api.delete(`/articles/${slug}/comments/${id}`)
}
