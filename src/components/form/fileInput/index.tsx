// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel, CInputFile } from '@coreui/react'

export interface Props {
  onChange?: any
  label: string
  formText?: string
  placeholder?: string
  isRow?: boolean
}

const Table: FC<Props> = ({
  onChange,
  label,
  formText,
  placeholder,
  isRow = true,
}) => {
  return isRow ? (
    <CFormGroup row>
      <CCol lg="4">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol>
        <CInputFile
          id="file-input"
          name="file-input"
          placeholder={placeholder}
          onChange={onChange}
        />
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <CInputFile
          id="file-input"
          name="file-input"
          placeholder={placeholder}
          onChange={onChange}
        />
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
