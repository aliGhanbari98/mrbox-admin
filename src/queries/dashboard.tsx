import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getDashboardVendorsReq = reqWrapper((params) =>
  axios.get(`/dashboard/vendors`, { params }).then((data) => data)
)

export const getDashboardProductsReq = reqWrapper((params) =>
  axios.get(`/dashboard/products`, { params }).then((data) => data)
)

export const getDashboardOrdersReq = reqWrapper((params) =>
  axios.get(`/dashboard/orders`, { params }).then((data) => data)
)

export const getDashboardChartReq = reqWrapper((params) =>
  axios.get('/dashboard/charts/sales', { ...params }).then((data) => data)
)

export const getDashboardStatistics = reqWrapper(() =>
  axios.get('/dashboard/statistics').then((data) => data)
)
