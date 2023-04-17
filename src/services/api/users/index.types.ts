export type User = {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export type LoginInputs = {
  email: string
  password: string
}

export type RegisterInputs = {
  email: string
  username: string
  password: string
}

export type UpdateInputs = {
  email: string
  username: string
  bio: string
  password: string
  image: string
}

export type UserResponse = {
  user?: User
  errors?: {
    [Property in keyof User]?: Array<string>
  }
}
