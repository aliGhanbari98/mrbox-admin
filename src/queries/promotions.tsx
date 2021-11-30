import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getPromotionsReq = reqWrapper((params) =>
  axios.get(`/promotions`, { params }).then((data) => data)
)

export const addPromotionReq = reqWrapper((body) =>
  axios.post('/promotions', { ...body }).then((data) => data)
)

export const getSinglePromotion = reqWrapper((id) =>
  axios.get(`/promotions/${id}`).then((data) => data)
)

export const deleteSinglePromotion = reqWrapper((id) =>
  axios.delete(`/promotions/${id}`).then((data) => data)
)

export const updatePromotions = reqWrapper(({ body, ids }) =>
  axios
    .patch('/promotions', { promotion_ids: ids, ...body })
    .then((data) => data)
)

export const deleteBulkPromotions = reqWrapper((ids) =>
  axios.delete(`/promotions`, { data: { ids } }).then((data) => data)
)
