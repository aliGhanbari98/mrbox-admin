// modules
import { FC } from 'react'
// components
import { CRow, CCol } from '@coreui/react'
import { TextField, Button, TextArea } from 'src/components'
import { CIcon } from '@coreui/icons-react'
// style
import styles from './index.module.scss'

const inputs = {
  textArea: TextArea,
  textField: TextField,
}

interface Props {
  data: any
  setData: any
  title: string
  inputType?: string
}

const canAddNew = (data) => {
  let result = true
  data.forEach((item) => {
    if (!item) result = false
  })
  return result
}

const MultiStringInput: FC<Props> = ({
  setData,
  data,
  title,
  inputType = 'textField',
}) => {
  const addItem = () => {
    setData((prevItems) => [...prevItems, ''])
  }

  const removeItem = (targetIndex) => {
    setData((prevItems) =>
      prevItems.filter((item, index) => targetIndex !== index)
    )
  }

  const onTextChange = (value, targetIndex) => {
    setData((prevState) =>
      prevState.map((item, index) => (targetIndex === index ? value : item))
    )
  }

  const canAddNewItem = canAddNew(data)

  const Input = inputs[inputType]

  return (
    <CRow className={styles.multiLanguageInput}>
      <CCol sm="4" md="4" lg="4">
        {title}
      </CCol>
      <CCol sm="8" md="8" lg="8">
        <CRow>
          {data.map((item, index) => (
            <>
              <CCol key={index} sm="9" md="10" lg="10">
                <Input
                  value={item}
                  onChange={(value) => onTextChange(value, index)}
                />
              </CCol>
              <CCol sm="3" md="2" lg="2">
                <Button color="danger" onClick={() => removeItem(index)}>
                  <CIcon size="sm" name="cilDelete" />
                </Button>
              </CCol>
            </>
          ))}
        </CRow>
        <CRow className="right">
          <CCol lg="12">
            <Button
              color={canAddNewItem ? 'success' : 'danger'}
              text="Add"
              onClick={addItem}
              fullWidth
              disabled={!canAddNewItem}
            >
              <CIcon size="sm" name="cibAddthis" />
            </Button>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default MultiStringInput
