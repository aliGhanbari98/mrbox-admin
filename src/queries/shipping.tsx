import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getShippingsReq = reqWrapper((params) =>
  axios.get(`/shippings`, { params }).then((data) => data)
)

export const addShippingReq = reqWrapper((body) =>
  axios.post('/shippings', { ...body }).then((data) => data)
)

export const getSingleShippingReq = reqWrapper((id) =>
  axios.get(`/shippings/${id}`).then((data) => data)
)

export const DeleteSingleShipping = reqWrapper((id) =>
  axios.delete(`/shippings/${id}`).then((data) => data)
)

export const updateSingleShipping = reqWrapper(({ id, body }) =>
  axios.patch(`/shippings/${id}`, { ...body }).then((data) => data)
)
