import { TextField } from '../..'
import {
  CCol,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CLabel,
} from '@coreui/react'
import { FC } from 'react'

export interface Props {
  onChange?: any
  value?: any
  label?: string
  formText?: string
  placeholder?: string
  className?: string
  isRow?: boolean
  disabled?: boolean
  addon?: string
}

const inputGroup: FC<Props> = ({
  onChange,
  label,
  value,
  formText,
  placeholder,
  className,
  isRow = true,
  disabled,
  addon,
}) => {
  return (
    <CFormGroup row>
      {label && (
        <CCol md="4">
          <CLabel>{label}</CLabel>
        </CCol>
      )}
      <CCol>
        <CInputGroup>
          <CInput
            onChange={(e) => onChange && onChange(e.currentTarget.value)}
            id="text-input"
            name="text-input"
            disabled={disabled}
            value={value}
            placeholder={placeholder}
          />
          <CInputGroupAppend>
            <CInputGroupText>{addon}</CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </CCol>
    </CFormGroup>
  )
}

export default inputGroup
