// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol } from '@coreui/react'
import { TextField } from 'src/components'
// queries
import { getCountriesReq } from 'src/queries/countries'
// style
import styles from './index.module.scss'

interface Props {
  data: any
  setData: any
  title?: string
}

const MultiLanguageInput: FC<Props> = ({ setData, data = {}, title }) => {
  const [currencies, setCurrencies] = useState([{ code: '', name: '' }])

  const onTextChange = (value, currency) => {
    setData((prevState) => ({ ...prevState, [currency]: value }))
  }

  useEffect(() => {
    getCountriesReq({}).then(({ result }) => {
      setCurrencies(
        result.map(({ currency_code, currency: { name } }) => ({
          code: currency_code,
          name,
        }))
      )
    })
  }, [])

  return (
    <CRow className={styles.multiLanguageInput}>
      <CCol lg="4">{title || 'Price'}</CCol>
      <CCol lg="8">
        <CRow className="center">
          {currencies.map(({ code, name }) => (
            <>
              <CCol lg="8">
                <TextField
                  value={Object.keys(data).length && (data[name] || data[code])}
                  onChange={(value) => onTextChange(value, name)}
                />
              </CCol>
              <CCol lg="4">
                <TextField disabled placeholder={name} />
              </CCol>
            </>
          ))}
        </CRow>
      </CCol>
    </CRow>
  )
}

export default MultiLanguageInput
