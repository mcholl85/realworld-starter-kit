import { postArticleParams, getArticlesParams, updateArticleParams } from './index.types'
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants'
import api from '..'
import { IArticle, IArticlesResponse } from '../../../interfaces'

export const getArticles = async ({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
  feed,
  tag,
  author,
  favorited,
}: getArticlesParams): Promise<IArticlesResponse> => {
  return await (
    await api.get(
      `/articles${feed ? '/feed' : ''}?${tag ? `tag=${tag}&` : ''}${
        author ? `author=${author}&` : ''
      }${favorited ? `favorited=${favorited}&` : ''}limit=${limit}&offset=${offset}`,
    )
  ).data
}

export const getArticle = async (slug?: string): Promise<IArticle> => {
  return await (
    await api.get(`/articles/${slug}`)
  ).data.article
}

export const postArticle = async ({ form }: postArticleParams): Promise<IArticle> => {
  return await (
    await api.post('/articles', { article: form })
  ).data.article
}

export const putArticle = async ({ form, slug }: updateArticleParams): Promise<IArticle> => {
  return await (
    await api.put(`/articles/${slug}`, { article: form })
  ).data.article
}

export const deleteArticle = async (slug: string): Promise<IArticle> => {
  return await (
    await api.delete(`/articles/${slug}`)
  ).data.article
}

export const postFavorite = async (slug: string): Promise<IArticle> => {
  return await (
    await api.post(`/articles/${slug}/favorite`)
  ).data.article
}

export const deleteFavorite = async (slug: string): Promise<IArticle> => {
  return await (
    await api.delete(`/articles/${slug}/favorite`)
  ).data.article
}
