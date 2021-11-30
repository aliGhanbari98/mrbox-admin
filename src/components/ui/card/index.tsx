// modules
import { FC, useState, useEffect } from 'react'
// components
import { CCard, CCardBody, CCardHeader, CCollapse } from '@coreui/react'
import { SectionActions, Filters, Button } from 'src/components'
// other
import { useToggle } from 'src/helpers/hooks'
// styles
import styles from './index.module.scss'

interface FilterItem {
  onChange: any
  label: string
  type?: string
}

export interface Props {
  header?: string
  className?: string
  headerActions?: any
  filterItems?: Array<FilterItem>
  onFilterclick?: () => void
}

const Card: FC<Props> = ({
  header,
  className,
  headerActions,
  filterItems,
  children,
  onFilterclick,
}) => {
  const { value: filtersCollapsed, toggle: setFiltersCollapsed } = useToggle(
    false
  )
  const [modifiedActions, setModifiedActions] = useState([])
  useEffect(() => {
    if (!headerActions) return
    setModifiedActions(
      headerActions.map((item) =>
        item.type === 'filter'
          ? {
              ...item,
              onClick: setFiltersCollapsed,
            }
          : item
      )
    )
  }, [])
  return (
    <CCard className={className}>
      <CCardHeader className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.title}>{header}</div>
          {headerActions && <SectionActions items={modifiedActions} />}
        </div>
        <CCollapse show={filtersCollapsed}>
          <CCardBody>
            <Filters
              onFilterClick={onFilterclick || Function.prototype()}
              items={filterItems || []}
            />
            {/* <CRow>
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
            </CRow> */}
          </CCardBody>
        </CCollapse>
      </CCardHeader>
      <CCardBody>{children}</CCardBody>
    </CCard>
  )
}

export default Card
