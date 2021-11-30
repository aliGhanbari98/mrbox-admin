// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import {
  Table,
  TextField,
  Button,
  CreatableSelect,
  MultiSelect,
} from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'
// queries
import { getEntitiesReq } from 'src/queries/entities'

interface Item {
  entity: string
  rules: Array<string>
}

interface Props {
  items: Array<Item>
  setState: any
  title?: string
  tableFieldsKey?: string
  groupPermissions?: boolean
}

const Permissions: FC<Props> = ({
  items = [],
  setState,
  title,
  tableFieldsKey,
  groupPermissions = false,
}) => {
  const [entity, setEntity] = useState('')
  const [rules, setRules] = useState([''])
  const [editingItemId, setEditingItemId] = useState('')
  const [entitiesOption, setEntitiesOptions] = useState([])

  const reset = () => {
    setEntity('')
    setRules([])
  }

  const addItem = () => {
    setState((prevState) => [...prevState, { entity, rules }])
    setEditingItemId('')
    reset()
  }

  const updateItem = () => {
    setState((items) =>
      items.map((item, index) =>
        index === editingItemId ? { ...item, entity, rules } : item
      )
    )
    setEditingItemId('')
    reset()
  }

  const deleteItem = (targetIndex) => {
    setState((items) => items.filter((item, index) => targetIndex !== index))
    setEditingItemId('')
    reset()
  }

  const selectEditingItem = (targetIndex) => {
    const { entity, rules } = items.find(
      (item, index) => index === targetIndex
    ) || {
      entity: '',
      rules: [],
    }
    setEditingItemId(targetIndex)
    setEntity(entity)
    setRules(rules)
  }

  const onEntityChange = (item) => {
    console.log(item)
    setEntity(item.label)
    setRules(item.value)
  }

  console.log({ rules, entity })

  useEffect(() => {
    if (groupPermissions)
      getEntitiesReq({}).then(({ result }) => {
        setEntitiesOptions(
          result.map(({ code_name, rules }) => ({
            label: code_name,
            value: rules,
          }))
        )
      })
  }, [])

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{title || 'Permissions'}</CCardHeader>
          <CCardBody>
            <CRow className="center">
              <CCol lg="5">
                {groupPermissions ? (
                  <MultiSelect
                    label="Permission"
                    options={entitiesOption}
                    isMulti={false}
                    onChange={onEntityChange}
                    value={{ label: entity, value: entity }}
                    isRow={false}
                    returnWholeItem
                  />
                ) : (
                  <TextField
                    label="Entity"
                    value={entity}
                    isRow={false}
                    onChange={setEntity}
                  />
                )}
              </CCol>
              <CCol lg="5">
                <CreatableSelect
                  label="Rules"
                  isRow={false}
                  value={
                    rules[0] === ''
                      ? []
                      : rules.map((item) => ({ label: item, value: item }))
                  }
                  onChange={setRules}
                />
              </CCol>
              <CCol lg="2">
                {editingItemId === '' ? (
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
              fields={
                tableFieldsKey
                  ? tablesFields[tableFieldsKey]
                  : tablesFields.permissions
              }
              pagination={false}
              data={items.map((item, index) => ({
                ...item,
                onDelete: () => deleteItem(index),
                onEdit: () => selectEditingItem(index),
              }))}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Permissions
