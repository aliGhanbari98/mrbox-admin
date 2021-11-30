import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getLanguagesReq = reqWrapper((params) =>
  axios.get(`/languages`, { params }).then((data) => {
    return data
  })
)
