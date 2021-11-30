import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getCategoriesReq = reqWrapper((params) =>
  axios.get(`/categories`, { params }).then((data) => data)
)

export const addCategoryReq = reqWrapper((body) =>
  axios.post('/categories', { ...body }).then((data) => data)
)

export const getSingleCategory = reqWrapper((id) =>
  axios.get(`/categories/${id}`).then((data) => data)
)

export const deleteSingleCategory = reqWrapper((id) =>
  axios.delete(`/categories/${id}`).then((data) => data)
)

export const updateSingleCategory = reqWrapper(({ id, body }) =>
  axios.patch(`/categories/${id}`, { ...body }).then((data) => data)
)
