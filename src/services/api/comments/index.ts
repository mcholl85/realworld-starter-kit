import api from '..'
import { Comment, deleteCommentInputs, postCommentInputs } from './index.type'

export const getComments = async (slug: string): Promise<Comment[]> => {
  return await (
    await api.get(`/articles/${slug}/comments`)
  ).data.comments
}

export const postComment = async ({ slug, form }: postCommentInputs): Promise<Comment> => {
  return await (
    await api.post(`/articles/${slug}/comments`, { comment: form })
  ).data.comment
}

export const deleteComment = async ({ slug, id }: deleteCommentInputs) => {
  await api.delete(`/articles/${slug}/comments/${id}`)
}
