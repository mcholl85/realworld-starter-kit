import api from '..'

export const getTags = async (): Promise<string[]> => {
  return (await api.get('/tags')).data.tags
}
