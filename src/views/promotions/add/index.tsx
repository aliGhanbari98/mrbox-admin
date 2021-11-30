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
import { DateInput, TextField, MultiSelect, Button } from 'src/components'
// constants
import options from 'src/constants/options'
// helpers
import { successAlert } from 'src/helpers/alerts'
// queries
import {
  addPromotionReq,
  getSinglePromotion,
  updatePromotions,
} from 'src/queries/promotions'
import { getCategoriesReq } from 'src/queries/categories'
import { getProductsReq } from 'src/queries/products'
import { getVendorsReq } from 'src/queries/vendors'

const queriesMap = {
  vendor: getVendorsReq,
  category: getCategoriesReq,
  product: getProductsReq,
}

const AddPromotion: FC = () => {
  const { updatingPromotionId } = useParams()
  const router = useHistory()

  const [name, setName] = useState('')
  const [start_datetime, setStartDatetime] = useState('')
  const [end_datetime, setEndDatetime] = useState('')
  const [discount, setDiscount] = useState('')
  const [target, setTarget] = useState({ type: '', entity_ids: [] })
  const [entitiesOptions, setEntitiesOptions] = useState([{}])
  const [selectValue, setSelectValue] = useState([])
  const [typeSelectValue, setTypeSelectValue] = useState([{}])

  const isUpdating = updatingPromotionId !== 'new'

  const getInitialEntitiesData = ({ type, entity_ids }) => {
    console.log({ type, entity_ids })
    if (type === 'all') return
    const query = queriesMap[type]
    query({}).then(({ result }) => {
      setSelectValue(
        result
          .filter(({ id }) => entity_ids.find((targetId) => targetId === id))
          .map(({ id, title }) => ({ value: id, label: title }))
      )
      setEntitiesOptions(
        result.map(({ id, title }) => ({
          value: id,
          label: title,
        }))
      )
    })
  }

  const getData = () => {
    getSinglePromotion(updatingPromotionId).then(
      ({ discount, start_datetime, end_datetime, target, name }) => {
        console.log(target)
        setName(name)
        setDiscount(discount)
        setStartDatetime(start_datetime)
        setEndDatetime(end_datetime)
        setTarget(target)
        setTypeSelectValue([{ label: target.type, value: target.type }])
        getInitialEntitiesData(target)
      }
    )
  }

  const submit = () => {
    const payload = {
      start_datetime,
      end_datetime,
      status: 'pending',
      name,
      discount,
      target,
    }

    const query = isUpdating
      ? updatePromotions({ body: payload, ids: [updatingPromotionId] })
      : addPromotionReq(payload)

    query.then(() => {
      successAlert(() => router.push('/promotions'))
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <>
      <CRow className="center">
        <CCol lg="5">
          <CCard>
            <CCardHeader>Information</CCardHeader>
            <CCardBody>
              <CForm>
                <TextField label="Name" value={name} onChange={setName} />
                <DateInput
                  label="Start Date"
                  value={start_datetime}
                  onChange={setStartDatetime}
                />
                <DateInput
                  label="End Date"
                  value={end_datetime}
                  onChange={setEndDatetime}
                />
                <TextField
                  label="Discount Percentage"
                  value={discount}
                  onChange={setDiscount}
                />

                <MultiSelect
                  isMulti={false}
                  label="Target Type"
                  name="Tags"
                  options={options.PromotionTargetType}
                  value={typeSelectValue}
                  onChange={({ value, label }) => {
                    if (value === target.type) return // to avoid unnecessary query call
                    setSelectValue([])
                    setTypeSelectValue([{ label, value }])
                    if (value === 'all') {
                      setTarget({ entity_ids: [], type: 'all' })
                      setSelectValue([])
                      return
                    }
                    setTarget({ entity_ids: [], type: '' })
                    const query = queriesMap[value]
                    query({}).then(({ result }) => {
                      setTarget({ entity_ids: [], type: value })
                      setEntitiesOptions(
                        result.map(({ id, title }) => ({
                          value: id,
                          label: title,
                        }))
                      )
                    })
                  }}
                />

                {target.type && target.type !== 'all' && (
                  <MultiSelect
                    label="Entities"
                    options={entitiesOptions}
                    returnWholeItem
                    value={selectValue}
                    onChange={(item) => {
                      console.log(item)
                      setSelectValue(item)
                      setTarget((state) => ({
                        ...state,
                        entity_ids: item.map(({ value }) => value),
                      }))
                    }}
                  />
                )}
              </CForm>
            </CCardBody>
            <CCardFooter>
              <Button text="Submit" onClick={submit} />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddPromotion
