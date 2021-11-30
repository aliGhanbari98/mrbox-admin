import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getEntitiesReq = reqWrapper((params) =>
  axios.get(`/entities`, { params }).then((data) => data)
)

export const getSingleEntity = reqWrapper((id) =>
  axios.get(`/entities/${id}`).then((data) => data)
)

export const addNewEntitiy = reqWrapper((body) =>
  axios.post('/entities', { ...body }).then((data) => data)
)

export const deleteSingleEntity = reqWrapper((id) =>
  axios.delete(`/entities/${id}`).then((data) => data)
)

export const updateSingleEntity = reqWrapper(({ id, body }) =>
  axios.patch(`/entities/${id}`, { ...body }).then((data) => data)
)
