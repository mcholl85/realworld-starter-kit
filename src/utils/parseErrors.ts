import { IErrors } from '../interfaces'

export const parseErrors = (errors: IErrors): Array<string> => {
  return [...Object.entries(errors)].map((key) => `${key[0]} ${key[1]}`)
}
