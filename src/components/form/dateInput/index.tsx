// modules
import { FC } from 'react'
import moment from 'moment'
// components
import { CFormGroup, CCol, CFormText, CLabel, CInput } from '@coreui/react'

export interface Props {
  onChange?: any
  label: string
  formText?: string
  placeholder?: string
  isRow?: boolean
  convertToISO?: boolean
  value?: any
}

const Table: FC<Props> = ({
  onChange,
  label,
  formText,
  placeholder,
  isRow = true,
  value,
  convertToISO = true,
}) => {
  return isRow ? (
    <CFormGroup row>
      <CCol md="4">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol>
        <CInput
          onChange={(e) =>
            convertToISO
              ? onChange(new Date(e.currentTarget.value))
              : onChange(e.currentTarget.value)
          }
          type="date"
          value={value && new Date(value).toISOString().substring(0, 10)}
          id="text-input"
          name="text-input"
          placeholder={placeholder}
        />
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <CInput
          onChange={(e) =>
            convertToISO
              ? onChange(new Date(e.currentTarget.value))
              : onChange(e.currentTarget.value)
          }
          type="date"
          value={value && new Date(value).toISOString().substring(0, 10)}
          id="text-input"
          name="text-input"
          placeholder={placeholder}
        />
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
