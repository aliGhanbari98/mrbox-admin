// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
// components
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
} from '@coreui/react'
import { TextField, Button, DateInput, Price } from 'src/components'
// helpers
import { successAlert } from 'src/helpers/alerts'
// queries
import {
  addCouponReq,
  updateCouponsReq,
  getSingleCoupon,
} from 'src/queries/coupons'

const AddCoupon: FC = () => {
  const { updatingCouponId } = useParams()
  const router = useHistory()

  const [name, setName] = useState('')
  const [start_datetime, setStartDatetime] = useState('')
  const [end_datetime, setEndDatetime] = useState('')
  const [discount_percentage, setDiscountPercentage] = useState('')
  const [discount_amount, setDiscountAmount] = useState('')
  const [max_quantity, setMaxQuantity] = useState('')
  const [code, setCode] = useState('')

  const isUpdating = updatingCouponId !== 'new'

  const getData = () => {
    getSingleCoupon(updatingCouponId).then(
      ({
        code,
        create_datetime,
        discount_amount,
        discount_percentage,
        end_datetime,
        max_quantity,
        name,
        start_datetime,
      }) => {
        setName(name)
        setStartDatetime(start_datetime)
        setEndDatetime(end_datetime)
        setDiscountPercentage(discount_percentage)
        setDiscountAmount(discount_amount)
        setMaxQuantity(max_quantity)
        setCode(code)
      }
    )
  }

  const submit = () => {
    const payload = {
      name,
      max_quantity,
      code,
      discount_amount,
      discount_percentage,
      start_datetime,
      end_datetime,
    }

    const query = isUpdating
      ? updateCouponsReq({ body: payload, ids: [updatingCouponId] })
      : addCouponReq(payload)

    query.then(() => {
      successAlert(() => {
        router.push('/coupons')
      })
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <CRow className="center">
      <CCol lg="5">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <TextField label="Name" value={name} onChange={setName} isRow />
              <TextField label="Code" value={code} onChange={setCode} isRow />
              <TextField
                label="Max Quantity"
                value={max_quantity}
                onChange={setMaxQuantity}
                isRow
              />
              <DateInput
                label="Start Datetime"
                onChange={setStartDatetime}
                value={start_datetime}
                isRow
              />
              <DateInput
                label="End Datetime"
                value={end_datetime}
                onChange={setEndDatetime}
                isRow
              />
              <TextField
                label="Discount Percentage"
                onChange={setDiscountPercentage}
                isRow
                value={discount_percentage}
              />
              <Price
                title="Discount Amount"
                data={discount_amount}
                setData={setDiscountAmount}
              />
              {/* <MultiSelect label="Category" name="Tags" /> */}
              {/* <MultiSelect isMulti={false} label="Vendor" name="Tags" /> */}
            </CForm>
          </CCardBody>
          <CCardFooter>
            <Button text="Submit" onClick={submit} />
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddCoupon
