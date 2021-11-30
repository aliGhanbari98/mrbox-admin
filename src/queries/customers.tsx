import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getCustomersReq = reqWrapper((params) =>
  axios.get(`/users/customers`, { params }).then((data) => data)
)

export const getSingleCustomerReq = reqWrapper((id) =>
  axios.get(`/users/customers/${id}`).then((data) => data)
)

export const addCustomerReq = reqWrapper((body) =>
  axios.post('/users/customers', { ...body }).then((data) => data)
)

export const updateSingleCustomer = reqWrapper(({ body, id }) =>
  axios.patch(`/users/customers/${id}`, { ...body }).then((data) => data)
)

export const deleteSingleCustomer = reqWrapper((id) =>
  axios.delete(`/customers/${id}`).then((data) => data)
)

export const getCustomersStatistics = reqWrapper(() =>
  axios.get('/customers/statistics').then((data) => data)
)
