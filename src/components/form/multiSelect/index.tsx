// modules
import { FC } from 'react'
// components
import { CFormGroup, CCol, CFormText, CLabel } from '@coreui/react'
import Select from 'react-select'

export interface Props {
  onChange?: any
  options?: any
  defaultValue?: Array<any>
  label?: string
  formText?: string
  isMulti?: boolean
  name?: string
  isRow?: boolean
  isCreatable?: boolean
  disabled?: boolean
  returnWholeItem?: boolean
  placeholder?: string
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
  isCreatable = true,
  placeholder,
  disabled = false,
  value,
  returnWholeItem = false,
}) => {
  return isRow ? (
    <CFormGroup row>
      {label && (
        <CCol md="4">
          <CLabel>{label}</CLabel>
        </CCol>
      )}
      <CCol>
        <Select
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          options={options}
          isDisabled={disabled}
          placeholder={placeholder}
          className="basic-multi-select"
          classNamePrefix="select"
          value={value}
          onChange={(item) =>
            isMulti
              ? onChange(
                  item?.map((item) => (returnWholeItem ? item : item.value))
                )
              : onChange(item)
          }
        />
      </CCol>
    </CFormGroup>
  ) : (
    <CFormGroup row>
      <CCol>
        <CLabel htmlFor="text-input">{label}</CLabel>
        <Select
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          options={options}
          value={value}
          isDisabled={disabled}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(item) =>
            isMulti
              ? onChange(
                  item?.map((item) => (returnWholeItem ? item : item.value))
                )
              : onChange(item)
          }
        />
        <CFormText>{formText}</CFormText>
      </CCol>
    </CFormGroup>
  )
}

export default Table
