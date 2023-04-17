import axios from 'axios'
import { BASE_API, USER_KEY } from '../../constants/api.constants'

const api = axios.create({
  baseURL: BASE_API,
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
