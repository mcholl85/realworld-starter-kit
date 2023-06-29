export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  tagList: Array<string>
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface IComment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface IProfile {
  username: string
  bio: string
  image: string
  following: boolean
}

export interface IArticlesResponse {
  articles?: Array<IArticle>
  articlesCount?: number
  errors?: IErrors
}

export interface IArticleResponse {
  article?: IArticle
  errors?: IErrors
}

export interface IUser {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export type IErrors = {
  [Property in keyof User]?: Array<string>
}

export interface IUserResponse {
  user?: User
  errors?: IErrors
}
