import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getConfigsReq = reqWrapper((params) =>
  axios.get(`/configs`, {params}).then((data) => data)
)

export const updateConfigsReq = reqWrapper(({config_id, data}) =>
  axios.patch(`/configs/${config_id}`, {...data}).then((data) => data)
)
