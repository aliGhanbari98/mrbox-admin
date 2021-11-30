// modules
import { FC, useState, useEffect } from 'react'
// components
import {
  CCard,
  CCol,
  CCardBody,
  CCardHeader,
  CDataTable,
  CCollapse,
  CBadge,
  CRow,
  CPagination,
} from '@coreui/react'
import { SectionActions, Filters, MultiSelect, Button } from 'src/components'
import { CIcon } from '@coreui/icons-react'
// other
import scopedSlots from './scopedSlots'
import { useToggle } from 'src/helpers/hooks'
import status from 'src/constants/status'
// styles
import styles from './index.module.scss'

interface FilterItem {
  onChange: any
  label: string
  type?: string
}

interface TabItem {
  key: string
  value: any
  onClick: any
  default?: boolean
}

export interface Props {
  data: any
  fields: Array<string>
  itemsPerPage?: number
  pagination?: boolean
  columnFilterSlot?: any
  columnFilter?: boolean
  header?: string
  className?: string
  clickableRows?: boolean
  viewActionPath?: string
  striped?: boolean
  noTotalCount?: boolean
  headerActions?: any
  filterItems?: Array<FilterItem>
  setSelectedItems?: any
  selectedItems?: Array<string>
  rowActions?: any
  setActivePage?: () => void
  onChangeStatus?: any
  tabs?: Array<TabItem>
  isLoading?: boolean
  statusOptionsKey?: string
  onPageChange?: any
  activePage?: number
  total?: number
  onFilterClick?: () => void
}

const Table: FC<Props> = ({
  data = [],
  fields,
  itemsPerPage = 10,
  pagination = true,
  columnFilterSlot,
  columnFilter,
  header,
  className,
  clickableRows,
  viewActionPath,
  striped = true,
  headerActions,
  filterItems,
  setSelectedItems,
  selectedItems,
  rowActions = [],
  noTotalCount,
  tabs = [],
  isLoading,
  statusOptionsKey = '',
  onChangeStatus,
  onPageChange,
  activePage,
  onFilterClick,
  total = 15,
}) => {
  const { value: filtersCollapsed, toggle: setFiltersCollapsed } = useToggle(
    false
  )
  const { value: bulkCollapsed, toggle: setBulkCollapsed } = useToggle(false)
  const [modifiedActions, setModifiedActions] = useState([])
  const [newStatus, setNewStatus] = useState('')

  const selectItem = (id) => setSelectedItems((items) => [...items, id])
  const unselectItem = (targetId) =>
    setSelectedItems((items) => items.filter((id) => id !== targetId))

  useEffect(() => {
    if (!headerActions) return
    setModifiedActions(
      headerActions.map((item) => {
        if (item.type === 'filter')
          return {
            ...item,
            onClick: setFiltersCollapsed,
          }
        else if (item.type === 'changeStatus')
          return {
            ...item,
            onClick: setBulkCollapsed,
          }
        else return item
      })
    )
  }, [headerActions])

  const items = data.map((item: any) => ({
    ...item,
    viewActionPath,
    selectItem,
    unselectItem,
    rowActions,
    selected: selectedItems?.find((id) => id === item.id),
  }))

  return (
    <CCard className={className}>
      {/* {tabs.length ? (
        <CCol className={styles.tabs} lg="12">
          <Tabs items={tabs} />
        </CCol>
      ) : null} */}
      {header && (
        <CCardHeader className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.title}>
              {header}
              {!noTotalCount && <CBadge color="primary">{total}</CBadge>}
            </div>
            {headerActions && <SectionActions items={modifiedActions} />}
          </div>
          <CCollapse show={filtersCollapsed || bulkCollapsed}>
            <CCardBody className={styles.headerBody}>
              {filtersCollapsed ? (
                <Filters
                  onFilterClick={onFilterClick || Function.prototype()}
                  items={filterItems || []}
                />
              ) : bulkCollapsed ? (
                <CRow>
                  <CCol lg="5">
                    <MultiSelect
                      label="Status"
                      onChange={({ value }) => setNewStatus(value)}
                      options={status[statusOptionsKey]}
                      isMulti={false}
                    />
                  </CCol>
                  <CCol lg="7" className={styles.changeStatusButtonContainer}>
                    <Button
                      size="sm"
                      onClick={() => onChangeStatus(newStatus)}
                      text="Update"
                      color="success"
                    >
                      <CIcon name="cilCheck" />
                    </Button>
                  </CCol>
                </CRow>
              ) : null}
            </CCardBody>
          </CCollapse>
        </CCardHeader>
      )}
      <CCardBody className={styles.body}>
        <CDataTable
          items={items}
          fields={fields}
          scopedSlots={scopedSlots}
          clickableRows={clickableRows}
          columnFilter={columnFilter}
          columnFilterSlot={columnFilterSlot}
          striped={striped}
          loading={isLoading}
        />
      </CCardBody>
      {pagination && data.length < total && (
        <CRow className="center">
          <CPagination
            pages={Math.ceil((total || data.lenth) / itemsPerPage)}
            activePage={activePage}
            onActivePageChange={(page) => {
              onPageChange(page)
            }}
          />
        </CRow>
      )}
    </CCard>
  )
}

export default Table
