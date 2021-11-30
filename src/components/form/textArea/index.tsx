// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CTextarea, CLabel, CInput } from '@coreui/react'

export interface Props {
  onChange?: any
  label: string
  formText?: string
  placeholder?: string
  id?: string
  name?: string
  value?: string
}

const Table: FC<Props> = ({
  onChange,
  label,
  value,
  formText,
  placeholder,
}) => (
  <CFormGroup row>
    {label && (
      <CCol md="4">
        <CLabel>{label}</CLabel>
      </CCol>
    )}
    <CCol>
      <CTextarea
        onChange={(e) => onChange && onChange(e.currentTarget.value)}
        id="text-input"
        name="text-input"
        placeholder={placeholder}
        value={value}
      >
        {formText}
      </CTextarea>
    </CCol>
  </CFormGroup>
)

export default Table
