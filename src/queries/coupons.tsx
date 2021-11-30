import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getCouponsReq = reqWrapper((params) =>
  axios.get(`/coupons`, { params }).then((data) => data)
)

export const addCouponReq = reqWrapper((body) =>
  axios.post('/coupons', { ...body }).then((data) => data)
)

export const getSingleCoupon = reqWrapper((id) =>
  axios.get(`/coupons/${id}`).then((data) => data)
)

export const updateCouponsReq = reqWrapper(({ body, ids }) =>
  axios.patch('/coupons', { coupon_ids: ids, ...body }).then((data) => data)
)

export const deleteSingleCouponReq = reqWrapper((id) =>
  axios.delete(`/coupons/${id}`).then((data) => data)
)

export const deleteBulkCoupons = reqWrapper((ids) =>
  axios.delete(`/coupons`, { data: { ids } }).then((data) => data)
)
