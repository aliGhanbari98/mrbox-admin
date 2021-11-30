import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getPagesReq = reqWrapper((params) =>
  axios.get(`/pages`, {params}).then((data) => data)
)

export const getSinglePagesReq = reqWrapper((page_id) =>
  axios.get(`/pages/${page_id}/`, {}).then((data) => data)
)

export const updateSinglePagesReq = reqWrapper((params) =>
  axios.patch(`/pages`, params).then((data) => data)
)
