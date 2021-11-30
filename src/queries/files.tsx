import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const uploadFileReq = reqWrapper(({ file, setProgressValue }) => {
  const bodyFormData = new FormData()
  bodyFormData.append('_file', file)
  const config = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      typeof setProgressValue === 'function' &&
        setProgressValue(percentCompleted)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  console.log(bodyFormData)
  return axios.post('/files', bodyFormData, config).then((data) => data)
})

export const uploadAvatar = reqWrapper(({ file, setProgressValue }) => {
  const bodyFormData = new FormData()
  bodyFormData.append('_file', file)
  const config = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      setProgressValue(percentCompleted)
    },
  }

  return axios.post(`/users/avatar`, bodyFormData, config).then((data) => data)
})

export const deleteFileReq = reqWrapper((ids) =>
  axios.delete(`/files`, { data: { ids: [ids] } }).then((data) => data)
)

export const getFilesReq = reqWrapper((params) =>
  axios.get(`/files`, { ...params }).then((data) => data)
)
