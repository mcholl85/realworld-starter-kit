export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  updatedAt: Date
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

export type IComment = {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}
