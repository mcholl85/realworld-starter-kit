export type Comment = {
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

export type postCommentInputs = {
  slug: string
  form: {
    body: string
  }
}

export type deleteCommentInputs = {
  slug: string
  id: number
}
