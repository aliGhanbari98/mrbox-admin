// modules
import { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
// components
import { CRow, CCol } from '@coreui/react'
import { TextField, Button, MultiSelect, TextArea } from 'src/components'
import { CIcon } from '@coreui/icons-react'
// helpers
import { removeSelectedOptions } from 'src/helpers/functions'
// style
import styles from './index.module.scss'

const inputs = {
  textArea: TextArea,
  textField: TextField,
}

interface Props {
  data: any
  setData: any
  langs: Array<any>
  title: string
  inputType?: string
}

const canAddNew = (data, items) => {
  let result = false
  items.forEach(({ lang }) => {
    if (!lang) result = false
    else if (!data[lang]) result = false
    else result = true
  })
  return result
}

const MultiLanguageInput: FC<Props> = ({
  setData,
  data,
  langs,
  title,
  inputType = 'textField',
}) => {
  const [langOptions, setLangOptions] = useState([{}])
  const [items, setItems] = useState([{ id: new Date(), lang: 'EN' }])

  const addItem = () => {
    setItems((prevItems) => [...prevItems, { id: new Date(), lang: '' }])
  }

  const onTextChange = (value, lang) => {
    setData((prevState) => ({ ...prevState, [lang]: value }))
  }

  const onLangChange = ({
    value,
    id: targetId,
    previousTextValue,
    previousLang,
  }) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        targetId === item.id ? { ...item, lang: value } : item
      )
    )
    setData((prevData) => {
      delete prevData[previousLang]
      return { ...prevData, [value]: previousTextValue }
    })
  }

  useEffect(() => {
    setLangOptions(
      langs.map(({ code, name }) => ({ label: name, value: code }))
    )
  }, [langs])

  useEffect(() => {
    if (!data.EN) return
    setItems(Object.keys(data).map((key) => ({ id: new Date(), lang: key })))
  }, [data])

  const finalLangOptions = removeSelectedOptions(
    items.map(({ lang }) => lang),
    langOptions || []
  )

  const canAddNewItem =
    (finalLangOptions.length && canAddNew(data, items)) || false

  const Input = inputs[inputType]

  return (
    <CRow className={styles.multiLanguageInput}>
      <CCol lg="4">{title}</CCol>
      <CCol lg="8">
        <CRow className="center">
          {items.map(({ id, lang }, index) => (
            <>
              {lang && (
                <CCol lg="8">
                  <Input
                    value={data[lang]}
                    onChange={(value) => onTextChange(value, lang)}
                  />
                </CCol>
              )}
              <CCol lg="4">
                <MultiSelect
                  isMulti={false}
                  options={finalLangOptions}
                  disabled={!index}
                  defaultValue={[{ label: lang, value: lang }]}
                  placeholder={index === 0 ? 'EN' : 'Lang'}
                  onChange={({ value }) =>
                    onLangChange({
                      value,
                      id,
                      previousTextValue: data[lang],
                      previousLang: lang,
                    })
                  }
                />
              </CCol>
            </>
          ))}
        </CRow>
        <CRow className="right">
          <CCol lg="12">
            <Button
              color={canAddNewItem ? 'success' : 'danger'}
              text={
                !finalLangOptions.length
                  ? 'No language left'
                  : 'Add In another Language'
              }
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

const mapStateToProps = ({ main }, props) => ({
  langs: main.langs,
})

export default connect(mapStateToProps, null)(MultiLanguageInput)
