import { FormValues } from '../../../pages/EditArticle'

export type getArticlesParams = {
  tag?: string
  username?: string
  isFavorite?: boolean
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

export type postCommentParams = {
  slug: string
  form: {
    body: string
  }
}

export type deleteCommentParams = {
  slug: string
  id: number
}
