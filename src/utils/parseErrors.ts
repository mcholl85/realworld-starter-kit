import { User } from '../services/api/users/index.types'

export type Errors = {
  [Property in keyof User]?: Array<string>
}

export const parseErrors = (errors: Errors): Array<string> => {
  return [...Object.entries(errors)].map((key) => `${key[0]} ${key[1]}`)
}
