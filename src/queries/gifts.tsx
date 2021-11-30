import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getGiftsReq = reqWrapper((params) =>
  axios.get(`/gifts`, { params }).then((data) => data)
)

export const addGiftReq = reqWrapper((body) => {
  return axios.post('/gifts', { ...body }).then((data) => data)
})

export const getSingleGift = reqWrapper((id) =>
  axios.get(`/gifts/${id}`).then((data) => data)
)

export const updateGifts = reqWrapper(({ body, ids }) =>
  axios.patch('/gifts', { gift_ids: ids, ...body }).then((data) => data)
)

export const deleteGiftReq = reqWrapper((id) =>
  axios.delete(`/gifts/${id}`).then((data) => data)
)

export const deleteBulkGifts = reqWrapper((ids) =>
  axios.delete(`/gifts`, { data: { ids } }).then((data) => data)
)
