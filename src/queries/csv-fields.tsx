import {reqWrapper} from "../helpers/queryWrapper";
import axios from "axios";

export const getCsvFieldsReq = reqWrapper((params) =>
  axios.get(`/product_fields`, { params }).then((data) => data)
)

export const addCsvFieldsReq = reqWrapper((body) =>
  axios.post('/product_fields', { ...body }).then((data) => data)
)

export const updateCsvFieldsReq = reqWrapper((body) =>
  axios.patch('/product_fields', { ...body }).then((data) => data)
)

export const getCsvPerCategoryReq = reqWrapper((params) =>
  axios.get('/product_fields_distinct', { params }).then((data) => data)
)

