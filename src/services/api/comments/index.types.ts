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
