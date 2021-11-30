// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel, CInput } from '@coreui/react'

export interface Props {
  onChange?: any
  value?: any
  label?: string
  formText?: string
  placeholder?: string
  className?: string
  isRow?: boolean
  disabled?: boolean
}

const Table: FC<Props> = ({
  onChange,
  label,
  value,
  formText,
  placeholder,
  className,
  isRow = true,
  disabled,
}) => {
  return isRow ? (
    <CFormGroup row>
      {label && (
        <CCol md="4">
          <CLabel>{label}</CLabel>
        </CCol>
      )}
      <CCol>
        <CInput
          onChange={(e) => onChange && onChange(e.currentTarget.value)}
          id="text-input"
          name="text-input"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
        />
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol className={className}>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <CInput
          onChange={(e) => onChange && onChange(e.currentTarget.value)}
          id="text-input" /*TODO: jesus fucking christ! id must be unique */
          value={value}
          disabled={disabled}
          name="text-input"
          placeholder={placeholder}
        />
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
