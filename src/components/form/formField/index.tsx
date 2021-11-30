// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel, CInput } from '@coreui/react'

export interface Props {
  onChange?: any
  label: string
  formText?: string
  placeholder?: string
  className?: string
  isRow?: boolean
}

const Table: FC<Props> = ({
  onChange,
  label,
  formText,
  placeholder,
  className,
  isRow,
  children,
}) => {
  return isRow ? (
    <CFormGroup row>
      <CCol md="4">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol>{children}</CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol className={className}>
        <CLabel htmlFor="text-input">{label}</CLabel>
        {children}
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
