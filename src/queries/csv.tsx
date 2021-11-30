import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const uploadProductsCSV = reqWrapper(
  ({ vendor: vendor_id, type: csv_type, file }) => {
    const bodyFormData = new FormData()
    bodyFormData.append('file', file)

    return axios
      .post(`/products/upload-csv/${vendor_id}/${csv_type}`, bodyFormData)
      .then((data) => data)
  }
)

export const getCSVStatus = reqWrapper((obj_id) =>
  axios.get(`/products/upload-csv/${obj_id}`).then((data) => data)
)
