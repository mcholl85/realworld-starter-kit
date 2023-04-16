import { FormValues } from '../../../pages/EditArticle'
import { Errors } from '../../../utils/parseErrors'
import { Article } from '../../hooks/use-article'

export type getArticlesInputs = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
  feed?: boolean
}

export type postArticleInputs = {
  form: FormValues
}

export type updateArticleInputs = postArticleInputs & { slug?: string }

export type deleteArticleInputs = {
  slug: string
}

export type articlesResponse = {
  articles: Array<Article>
  articlesCount: number
}

export type articleResponse = {
  article?: Article
  errors?: Errors
}
