// modules
import { FC, useState } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import {
  Table,
  TextField,
  Button,
  CreatableSelect,
  MultiSelect,
  MultiLangInput,
} from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'
// helpers
import options from 'src/constants/options'
// style
import styles from './index.module.scss'

interface Item {
  attribute_key: string
  values: Array<string>
  filter_type: string
  title: any
  id: string
  show_filter: boolean
  is_mandatory: boolean
}

interface Props {
  items: Array<Item>
  setState: any
  title?: string
  isTagBased?: boolean
}

const Brands: FC<Props> = ({ items = [], setState, title }) => {
  const [attKey, setAttKey] = useState('')
  const [attValues, setAttValues] = useState([''])
  const [attTitle, setAttTitle] = useState('')
  const [filterType, setFilterType] = useState('')
  const [editingItemId, setEditingItemId] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [isMandatory, setIsMandatory] = useState(false)

  const resetFields = () => {
    setAttKey('')
    setAttValues([])
    setAttTitle('')
    setFilterType('')
    setShowFilter(false)
    setIsMandatory(false)
  }

  const addItem = () => {
    setState((prevState) => [
      ...prevState,
      {
        attribute_key: attKey,
        values: attValues,
        title: attTitle,
        filter_type: filterType,
        show_filter: showFilter,
        is_mandatory: isMandatory,
        id: new Date(),
      },
    ])
    resetFields()
  }

  const updateItem = () => {
    setState((items) =>
      items.map((item) =>
        item.id === editingItemId
          ? {
              ...item,
              attribute_key: attKey,
              values: attValues,
              title: attTitle,
              filter_type: filterType,
              show_filter: showFilter,
              is_mandatory: isMandatory,
            }
          : item
      )
    )
    setEditingItemId('')
    resetFields()
  }
  const deleteItem = (targetId) =>
    setState((items) => items.filter(({ id }) => targetId !== id))

  const selectEditingItem = (targetId) => {
    const {
      attribute_key,
      values,
      title,
      filter_type,
      show_filter,
      is_mandatory,
    } = items.find(({ id }) => id === targetId) || {
      values: [],
      attribute_key: '',
      title: {},
      filter_type: '',
      show_filter: false,
      is_mandatory: false,
    }
    setEditingItemId(targetId)
    setAttKey(attribute_key)
    setAttValues(values)
    setAttTitle(title)
    setFilterType(filter_type)
    setShowFilter(show_filter)
    setIsMandatory(is_mandatory)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{title || 'Filter'}</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg="12">
                <MultiLangInput
                  data={attTitle}
                  setData={setAttTitle}
                  title="Title"
                />
              </CCol>
              <CCol lg="3">
                <TextField
                  label="Key"
                  isRow={false}
                  value={attKey}
                  onChange={setAttKey}
                />
              </CCol>
              <CCol lg="6">
                <CreatableSelect
                  label="Values"
                  isRow={false}
                  // value={attValues}
                  onChange={(items) => setAttValues(items)}
                />
              </CCol>
              <CCol lg="3">
                <MultiSelect
                  label="Filter Type"
                  isRow={false}
                  options={options.filterType}
                  placeholder="No"
                  isMulti={false}
                  onChange={({ value }) => setFilterType(value)}
                />
              </CCol>
            </CRow>

            <CRow className="center">
              <CCol lg="5">
                <MultiSelect
                  label="Show Filter"
                  isRow={false}
                  options={options.boolean}
                  placeholder="No"
                  isMulti={false}
                  onChange={({ value }) => setShowFilter(value)}
                />
              </CCol>
              <CCol lg="5">
                <MultiSelect
                  label="Is Mandatory"
                  isRow={false}
                  options={options.boolean}
                  isMulti={false}
                  onChange={({ value }) => setIsMandatory(value)}
                />
              </CCol>
              <CCol lg="2">
                {!editingItemId ? (
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
              fields={tablesFields.brands}
              pagination={false}
              data={items.map((item) => ({
                ...item,
                onDelete: deleteItem,
                onEdit: selectEditingItem,
              }))}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Brands
