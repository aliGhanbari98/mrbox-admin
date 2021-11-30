import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getProductsReq = reqWrapper((params) =>
  axios.get(`/products`, { params }).then((data) => data)
)

export const getSingleProduct = reqWrapper((id) =>
  axios.get(`/products/${id}`).then((data) => data)
)

export const getProductsStatistics = reqWrapper(() =>
  axios.get(`/products/statistics`).then((data) => data)
)

export const getProductsRates = reqWrapper((params) =>
  axios.get(`/products/rates`, { params }).then((data) => data)
)

export const getProductsReviews = reqWrapper((params) =>
  axios.get(`/products/reviews`, { params }).then((data) => data)
)

export const addProductReq = reqWrapper((body) =>
  axios.post('/products', { ...body }).then((data) => data)
)

export const deleteProductReq = reqWrapper((id) =>
  axios.delete(`/products/${id}`).then((data) => data)
)
export const changeProductsStatus = reqWrapper((body) =>
  axios.patch(`/products/status`, { ...body }).then((data) => data)
)

export const updateProductsReq = reqWrapper(({ body, id }) =>
  axios.patch(`/products/${id}`, { ...body }).then((data) => data)
)
