// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel, CSelect } from '@coreui/react'

export interface Props {
  onChange?: any
  options: any
  label: string
  formText?: string
  isRow?: boolean
}

const Table: FC<Props> = ({
  onChange,
  label,
  formText,
  options,
  isRow = true,
}) => {
  return isRow ? (
    <CFormGroup row>
      <CCol lg="4">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol>
        <CSelect
          id="text-input" /*TODO: jesus fucking christ! id must be unique */
          name="text-input"
          onChange={onChange}
        >
          <option value="" selected disabled>Please select item</option>
          {Array.isArray(options) && options.map(({ label, value }, index) => (
            <option
              value={value}
              key={index}
            >
              {label}
            </option>
          ))}
        </CSelect>
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <CSelect onChange={onChange} id="text-input" name="text-input">
          {Array.isArray(options) && options.map(({ label, value }, index) => (
            <option
              value={value}
              key={index}
            >
              {label}
            </option>
          ))}
        </CSelect>
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
