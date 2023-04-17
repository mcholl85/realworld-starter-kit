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
