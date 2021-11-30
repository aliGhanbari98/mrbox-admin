// modules
import { FC } from 'react'
// components
import { CCol, CRow } from '@coreui/react'
import { TextField, MultiSelect, Button } from 'src/components'
// styles
import styles from './index.module.scss'

interface Item {
  onChange: any
  label: string
  type?: string
}

export interface Props {
  items: Array<Item>
  onFilterClick: () => void
}

const inputFields = {
  textField: TextField,
  select: MultiSelect,
}

const Table: FC<Props> = ({ items, onFilterClick }) => {
  return (
    <CRow>
      {items.map((item, index) => {
        const Input = inputFields[item.type || 'textField']
        return (
          <CCol key={index} lg="3" className={styles.textField}>
            <Input {...item} />
          </CCol>
        )
      })}
      <CCol lg="12">
        <Button onClick={() => onFilterClick()} text="Filter" />
      </CCol>
    </CRow>
  )
}

export default Table
