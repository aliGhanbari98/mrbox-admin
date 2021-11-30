import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const deleteSingleUser = reqWrapper((id) =>
  axios.get(`/users/${id}`).then((data) => data)
)
