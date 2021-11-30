import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getBannersReq = reqWrapper((params) =>
  axios.get(`/banners`, { params }).then((data) => data)
)

export const getSingleBanner = reqWrapper((id) =>
  axios.get(`/banners/${id}`).then((data) => data)
)

export const updateBannersReq = reqWrapper(({ body, ids }) =>
  axios.post('/banners', { banner_ids: ids, ...body }).then((data) => data)
)

export const addBannerReq = reqWrapper((body) =>
  axios.post('/banners', { ...body }).then((data) => data)
)

export const deleteSingleBanner = reqWrapper((id) =>
  axios.delete(`/banners/${id}`).then((data) => data)
)

export const getBannersStatistics = reqWrapper(() =>
  axios.get('/banners/statistics').then((data) => data)
)
