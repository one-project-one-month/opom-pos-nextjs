import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://32ded80e3b49.ngrok-free.app',
})

Axios.defaults.baseURL = ''

Axios.interceptors.request.use(
  async (config) => {
    const token = '345|jqj4bs8EATw3CDl49YY1wqG9slgcEax2NRS0m2Iu8e2e1732'

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.set('ngrok-skip-browser-warning', '69420')
    return config
  },
  (error) => Promise.reject(error)
)

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      //refresh token api call
      // ....
      const access_token = ''
      Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      return Axios(error.config)
    }
    return Promise.reject(error)
  }
)

export default Axios
