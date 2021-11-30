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
import { TextField, Button, Price, MultiSelect } from 'src/components'
// helpers
import { successAlert } from 'src/helpers/alerts'
// queries
import {
  addShippingReq,
  updateSingleShipping,
  getSingleShippingReq,
} from 'src/queries/shipping'
// constnats
import options from 'src/constants/options'

const AddShipping: FC = () => {
  const { updatingShippingId } = useParams()
  const router = useHistory()

  const [country_code, setCountryCode] = useState('')
  const [min_weight, setMinWeight] = useState('')
  const [max_weight, setMaxWeight] = useState('')
  const [amount, setAmount] = useState({})
  const [max_dimension, setMaxDimension] = useState('')
  const [min_delivery_time, setMinDeliveryTime] = useState('')
  const [max_delivery_time, setMaxDeliveryTime] = useState('')
  const [is_enable, setIsEnable] = useState(false)

  const isUpdating = updatingShippingId !== 'new'

  const getData = () => {
    getSingleShippingReq(updatingShippingId).then(
      ({
        country_code,
        min_weight,
        max_weight,
        amount,
        max_dimension,
        min_delivery_time,
        max_delivery_time,
      }) => {
        setCountryCode(country_code)
        setMinWeight(min_weight)
        setMaxWeight(max_weight)
        setAmount(amount)
        setMaxDimension(max_dimension)
        setMinDeliveryTime(min_delivery_time)
        setMaxDeliveryTime(max_delivery_time)
      }
    )
  }

  const submit = () => {
    const payload = {
      country_code,
      min_weight,
      max_weight,
      amount,
      max_dimension,
      min_delivery_time,
      max_delivery_time,
      is_enable,
    }

    const query = isUpdating
      ? updateSingleShipping({ body: payload, id: updatingShippingId })
      : addShippingReq(payload)

    query.then(() => {
      successAlert(() => router.push('/shippings'))
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
              <MultiSelect
                label="Country"
                name="country"
                value={[{ label: country_code, value: country_code }]}
                options={options.countries}
                onChange={({ value }) => setCountryCode(value)}
                isMulti={false}
              />
              <TextField
                label="Min Weight"
                value={min_weight}
                onChange={setMinWeight}
              />
              <TextField
                label="Max Weight"
                value={max_weight}
                onChange={setMaxWeight}
              />
              <Price title="Amount" data={amount} setData={setAmount} />
              <TextField
                label="Max Dimenstion"
                value={max_dimension}
                onChange={setMaxDimension}
              />
              <TextField
                label="Min Delivery Time"
                value={min_delivery_time}
                onChange={setMinDeliveryTime}
              />
              <TextField
                label="Max Delivery Time"
                value={max_delivery_time}
                onChange={setMaxDeliveryTime}
              />
              <MultiSelect
                label="Is Enable"
                name="is_enable"
                value={[{ label: is_enable ? 'Yes' : 'No', value: is_enable }]}
                options={options.boolean}
                onChange={({ value }) => setIsEnable(value)}
                isMulti={false}
              />
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

export default AddShipping
