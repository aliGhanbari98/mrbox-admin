import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const loginReq = reqWrapper((body) =>
  axios.post('/auth/login', { ...body }).then((data) => data)
)
