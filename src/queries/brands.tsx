import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getBrandsReq = reqWrapper((params) =>
  axios.get(`/brands`, { ...params }).then((data) => data)
)

export const getSingleBrand = reqWrapper((name) =>
  axios.get(`/brands/${name}`).then((data) => data)
)

export const addBrandReq = reqWrapper((body) =>
  axios.post('/brands', { ...body }).then((data) => data)
)

export const updateBrandReq = reqWrapper((body) =>
  axios.patch('/brands', { ...body }).then((data) => data)
)

export const deleteBulkBrands = reqWrapper((body) => {
  console.log(body)
  return axios.delete('/brands', { data: body }).then((data) => data)
})
