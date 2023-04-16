import axios from 'axios'
const BASE_URL = 'https://api.realworld.io/api'
export const USER_KEY = 'user'

const api = axios.create({
  baseURL: BASE_URL,
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Access-Control-Allow-Credentiels'] = true

api.interceptors.request.use((request) => {
  const item = window.localStorage.getItem(USER_KEY)

  if (item) {
    const { token } = JSON.parse(item)

    if (token) request.headers['Authorization'] = `Token ${token}`
  }

  return request
})

export default api
