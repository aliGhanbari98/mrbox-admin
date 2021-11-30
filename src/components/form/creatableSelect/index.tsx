// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel, CSelect } from '@coreui/react'
import CreatableSelect from 'react-select/creatable'

export interface Props {
  onChange?: any
  options?: any
  defaultValue?: Array<string>
  label: string
  formText?: string
  isMulti?: boolean
  name?: string
  placeholder?: string
  returnWholeItem?: boolean
  isRow?: boolean
  value?: any
}

const Table: FC<Props> = ({
  onChange,
  label,
  formText,
  options,
  defaultValue,
  isMulti = true,
  name,
  isRow = true,
  value,
  returnWholeItem = false,
  placeholder,
}) => {
  return isRow ? (
    <CFormGroup row>
      <CCol md="4">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol>
        <CreatableSelect
          value={value}
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          options={options}
          placeholder={placeholder}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(item) =>
            onChange(returnWholeItem ? item : item?.map(({ value }) => value))
          }
        />
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <CreatableSelect
          value={value}
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          placeholder={placeholder}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(item) =>
            onChange(returnWholeItem ? item : item?.map(({ value }) => value))
          }
        />
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
