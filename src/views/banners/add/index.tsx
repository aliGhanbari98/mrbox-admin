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
import { TextField, MultiSelect, Button, EditablePhoto } from 'src/components'
// helpers
import { successAlert } from 'src/helpers/alerts'
// constants
import options from 'src/constants/options'
// queries
import { getPromotionsReq } from 'src/queries/promotions'
import {
  addBannerReq,
  updateBannersReq,
  getSingleBanner,
} from 'src/queries/banners'

const AddProduct: FC = () => {
  const { updatingBannerId } = useParams()
  const router = useHistory()

  const [promotionsOptions, setPromotionsOptions] = useState([])
  const [promotion, setPromotion] = useState({ id: '', name: '' })
  const [target_url, setTargetUrl] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [tags, setTags] = useState([])
  const [targetType, setTargetType] = useState('')

  const isUpdating = updatingBannerId !== 'new'

  const getData = () => {
    getSingleBanner(updatingBannerId).then(
      ({ promotion, tags, target_url, file, name }) => {
        setPromotion(promotion)
        setTargetUrl(target_url)
        setFile(file && file.thumbnail_url)
        setTags(tags)
        setName(name)
      }
    )
  }

  const submit = () => {
    const payload = target_url
      ? {
          promotion_id: promotion.id,
          tags,
          target_url,
          file,
          name,
        }
      : {
          promotion_id: promotion.id,
          tags,
          file,
          name,
        }

    const query = isUpdating
      ? updateBannersReq({ body: payload, ids: [updatingBannerId] })
      : addBannerReq(payload)

    query.then(() => {
      successAlert(() => router.push('/banners'))
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
    getPromotionsReq({}).then(({ result }) =>
      setPromotionsOptions(
        result.map(({ name, id }) => ({
          label: name,
          value: id,
        }))
      )
    )
  }, [])

  return (
    <CRow className="center">
      <CCol lg="5">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <TextField label="Name" value={name} onChange={setName} />
              <MultiSelect
                label="Target Type"
                options={[
                  { label: 'URL', value: 'url' },
                  { label: 'Promotion', value: 'promotion' },
                ]}
                isMulti={false}
                returnWholeItem={false}
                onChange={({ value }) => setTargetType(value)}
              />
              {targetType === 'url' ? (
                <TextField
                  label="URL"
                  value={target_url}
                  isRow
                  onChange={setTargetUrl}
                />
              ) : targetType === 'promotion' ? (
                <MultiSelect
                  label="Promotion"
                  options={promotionsOptions}
                  isMulti={false}
                  onChange={({ value, label }) => {
                    setPromotion({ id: value, name: label })
                  }}
                  value={{ label: promotion.name, value: promotion.id }}
                  isRow
                />
              ) : null}
              <MultiSelect
                label="Tags"
                value={tags.map((item) => ({ label: item, value: item }))}
                options={options.bannerTags}
                onChange={setTags}
              />
              <p>Suggested size: 900 * 250</p>
              <EditablePhoto
                noMargin
                src={file}
                size="wide"
                id="1"
                onChange={({ id }) => setFile(id)}
                onDelete={() => setFile('')}
                onEdit={({ id }) => setFile(id)}
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

export default AddProduct
