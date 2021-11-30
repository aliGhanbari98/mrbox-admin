import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getGroupsReq = reqWrapper((params) =>
  axios.get(`/groups`, { params }).then((data) => data)
)

export const getSingleGroup = reqWrapper((id) =>
  axios.get(`/groups/${id}`).then((data) => data)
)

export const addNewGroup = reqWrapper((body) =>
  axios.post('/groups', { ...body }).then((data) => data)
)

export const deleteSingleGroup = reqWrapper((id) =>
  axios.delete(`/groups/${id}`).then((data) => data)
)

export const updateSingleGroup = reqWrapper(({ id, body }) =>
  axios.patch(`/groups/${id}`, { ...body }).then((data) => data)
)
