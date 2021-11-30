import axios from 'axios'
// import { API_HOST } from './index'
import configs from './global'

console.log('API : ', configs.API)

axios.defaults.baseURL = configs.API

axios.interceptors.request.use((config) => {
  const conf = config
  conf.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return conf
})
