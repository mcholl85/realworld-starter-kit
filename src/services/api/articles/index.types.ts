import { FormValues } from '../../../pages/EditArticle'

export type getArticlesParams = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
  feed?: boolean
}

export type postArticleParams = {
  form: FormValues
}

export type updateArticleParams = postArticleParams & { slug?: string }

export type deleteArticleParams = {
  slug: string
}
