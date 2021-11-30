import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getVendorsReq = reqWrapper((params) =>
  axios.get(`/users/vendors/`, { params }).then((data) => data)
)

export const getOnlyVendorsReq = reqWrapper((params) =>
  axios.get(`/vendors/`, { params }).then((data) => data)
)

export const addVendorReq = reqWrapper((body) =>
  axios.post('/users/vendors', { ...body }).then((data) => data)
)

export const getSingleVendorReq = reqWrapper((id) =>
  axios.get(`/users/vendors/${id}`).then((data) => data)
)

export const updateSingleVendor = reqWrapper(({ id, body }) =>
  axios.patch(`/users/vendors/${id}`, { ...body }).then((data) => data)
)

export const updateBulkVendors = reqWrapper((body) =>
  axios.patch(`/vendors`, body).then((data) => data)
)
