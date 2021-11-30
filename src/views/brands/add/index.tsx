import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
} from '@coreui/react'
import { Button, TextField, FormField, EditablePhoto } from 'src/components'
import {
  addBrandReq,
  updateBrandReq,
  getSingleBrand,
} from '../../../queries/brands'
import { successAlert } from 'src/helpers/alerts'
import { useHistory } from 'react-router-dom'

const AddBrand: FC = () => {
  const router = useHistory()
  const { brand_name } = useParams()

  const [brandName, setBrandName] = useState('')
  const [logo, setLogo] = useState({ thumbnail_url: '' })
  const [logoId, setLogoId] = useState('')

  const isUpdating = brand_name !== 'new'

  const getData = () => {
    getSingleBrand(brand_name).then(({ name, logo }) => {
      setBrandName(name)
      setLogo(logo)
      setLogoId(logo.id)
    })
  }

  const submit = () => {
    const payload = {
      name: brandName,
      logo: logoId,
    }
    const query = isUpdating
      ? updateBrandReq({ body: payload, names: [brand_name] })
      : addBrandReq(payload)
    query.then(() => {
      successAlert(() => router.push('/brands'))
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
                <TextField
                  label="Name"
                  value={brandName}
                  formText="Name"
                  onChange={(name) => setBrandName(name)}
                />
                <FormField isRow label="Logo">
                  <EditablePhoto
                    src={logo.thumbnail_url}
                    id="1"
                    onChange={({ id }) => setLogoId(id)}
                    onEdit={({ id }) => setLogoId(id)}
                    onDelete={() => console.log('hey')}
                    size="sm"
                  />
                </FormField>
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

export default AddBrand
