// modules
import { FC, useEffect, useState } from 'react'
// constants
import tablesFields from 'src/constants/tablesFields'
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
import {
  FormField,
  TextField,
  Addresses,
  MultiSelect,
  Button,
  TextArea,
  DateInput,
  EditablePhoto,
} from 'src/components'
// styles
import styles from './index.module.scss'

const images = [{ src: '', id: '-1', onChange: () => console.log('add') }]

const AddDriver: FC = () => {
  const [addresses, setAddresses] = useState([])
  const [imagesState, setImages] = useState(images)

  const submit = () => console.log

  const addImage = () =>
    setImages((items) => [
      ...items,
      {
        onChange: () => console.log('add'),
        src: '',
        id: items.length + '',
      },
    ])

  const deleteImage = (targetId) => {
    setImages((items) =>
      items.filter(({ id }) => {
        return targetId !== id
      })
    )
  }

  useEffect(() => {
    //get user data by id here
  }, [])
  return (
    <CRow className="center">
      <CCol lg="7">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              {/* <FormField label="Avatar" isRow>
                <EditablePhoto
                  noMargin
                  src=""
                  size="sm"
                  id="1"
                  onChange={() => console.log()}
                  onDelete={() => console.log}
                  onEdit={() => console.log}
                />
              </FormField> */}
              <TextField label="First Name" />
              <TextField label="Last Name" />
              <TextField label="Phone Number" />
              <TextArea label="Address" />
              <MultiSelect
                label="Type"
                name="rype"
                options={[
                  { label: 'Super Admin', value: 'super_admin' },
                  { label: 'Reporter', value: 'reporter' },
                  { label: 'Finance', value: 'finance' },
                ]}
                isMulti={false}
              />
              <MultiSelect
                label="Gender"
                name="gender"
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'female' },
                ]}
                isMulti={false}
              />
              <MultiSelect label="Status" name="status" isMulti={false} />
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

export default AddDriver
