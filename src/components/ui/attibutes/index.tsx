// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, TextField, Button, CreatableSelect } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'
// helpers
import {
  convertArrayToObject,
  convertToAttributes,
} from 'src/helpers/functions'
// style
import styles from './index.module.scss'

interface Item {
  key: string
  value: any
}

interface Props {
  items: Array<Item>
  setState: any
  title?: string
  isTagBased?: boolean
  isUpdating?: boolean
  children?: any
}

const Attributes: FC<Props> = ({
  items = [],
  setState,
  isTagBased,
  title,
  isUpdating,
  children,
}) => {
  const [attKey, setAttKey] = useState('')
  const [attValue, setAttValue] = useState('')
  const [editingItemId, setEditingItemId] = useState('')
  const [isLocalUpdating, setIsLocalUpdating] = useState(false)
  // console.log(items)
  const addItem = () => {
    setState((prevState) => [
      ...prevState,
      { key: attKey, value: attValue, id: new Date() },
    ])
    setAttKey('')
    setAttValue('')
  }

  const updateItem = () => {
    console.log(items)
    setState((items) => {
      return items.map((item, index) =>
        index === editingItemId
          ? { ...item, key: attKey, value: attValue }
          : item
      )
    })
    setEditingItemId('')
    setAttKey('')
    setAttValue('')
  }

  const deleteItem = (targetIndex) =>
    setState((items) => items.filter((_, index) => targetIndex !== index))

  const selectEditingItem = (targetIndex) => {
    const { key, value } = items.find((_, index) => index === targetIndex) || {
      key: '',
      value: '',
    }
    setEditingItemId(targetIndex)
    setAttKey(key)
    setAttValue(value)
    setIsLocalUpdating(true)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{title || 'Attributes'}</CCardHeader>
          <CCardBody>
            <CRow className="center">
              <CCol lg="5">
                <TextField
                  label="key"
                  value={attKey}
                  isRow={false}
                  onChange={setAttKey}
                />
              </CCol>
              <CCol lg="5">
                {!isTagBased ? (
                  <TextField
                    label="Value"
                    isRow={false}
                    value={attValue}
                    onChange={setAttValue}
                  />
                ) : (
                  <CreatableSelect
                    label="Value"
                    isRow={false}
                    onChange={(items) =>
                      setAttValue(items.map(({ value }) => value).join(','))
                    }
                  />
                )}
              </CCol>
              <CCol lg="2">
                {editingItemId === '' || editingItemId === undefined ? (
                  <Button color="success" text="Add" onClick={addItem}>
                    <CIcon size="sm" name="cibAddthis" />
                  </Button>
                ) : (
                  <Button color="primary" text="Update" onClick={updateItem}>
                    <CIcon size="sm" name="cilPen" />
                  </Button>
                )}
              </CCol>
            </CRow>
            <Table
              header="Added"
              className="noBorder"
              fields={tablesFields.attributes}
              pagination={false}
              data={items
                .filter((item) => item.key)
                .map((item, index) => ({
                  ...item,
                  onDelete: () => deleteItem(index),
                  onEdit: () => selectEditingItem(index),
                }))}
            />
            {children || ''}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Attributes
