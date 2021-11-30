import axios from 'axios'
import { reqWrapper } from 'src/helpers/queryWrapper'

export const getCountriesReq = reqWrapper((params) =>
  axios.get(`/countries`, { params }).then((data) => data)
)

export const addNewCountry = reqWrapper((body) =>
  axios.post('/countries', { ...body }).then((data) => data)
)
