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
// queries
import { addGiftReq, updateGifts, getSingleGift } from 'src/queries/gifts'
// helpers
import { successAlert } from 'src/helpers/alerts'

const AddCoupon: FC = () => {
  const { updatingGiftId } = useParams()
  const router = useHistory()

  const [name, setName] = useState('')
  const [credit, setCredit] = useState({})
  const [start_datetime, setStartDatetime] = useState('')
  const [end_datetime, setEndDatetime] = useState('')

  const isUpdating = updatingGiftId !== 'new'

  const getData = () => {
    getSingleGift(updatingGiftId).then(
      ({ end_datetime, start_datetime, credit, name }) => {
        setStartDatetime(start_datetime)
        setEndDatetime(end_datetime)
        setCredit(credit)
        setName(name)
      }
    )
  }

  const submit = () => {
    const payload = {
      credit,
      start_datetime,
      end_datetime,
      is_used: true,
      used_datetime: '2021-06-11T12:54:24.775Z',
      used_by: 'string',
      name,
    }

    const query = isUpdating
      ? updateGifts({ body: payload, ids: [updatingGiftId] })
      : addGiftReq(payload)

    query.then(() => {
      successAlert(router.push('/gift-cards'))
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
              <TextField label="Name" value={name} onChange={setName} />
              <Price title="Credit" data={credit} setData={setCredit} />
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
