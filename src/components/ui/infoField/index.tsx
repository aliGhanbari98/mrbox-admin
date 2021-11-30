// modules
import { FC } from 'react'
import moment from 'moment'
// components
import { CRow, CCol, CCard, CBadge } from '@coreui/react'
import { Button } from 'src/components'
// helpers
import { getBadge } from 'src/helpers/getBadge'
// style
import styles from './index.module.scss'

interface Item {
  title?: string
  text?: string
  value?: string | number
  onAddClick?: () => void
  onEdit?: () => void
  status?: string
  onClick?: () => void
  isDate?: boolean
}

interface Props {
  item?: Item
  fullWidth?: boolean
  isRow?: boolean
}

const handleValue = (value) =>
  typeof value === 'object' ? (
    <div className={styles.langField}>
      {Object.keys(value).map((key, index) => (
        <div key={index}>
          <span className="text-primary">{`${key}: `}</span>
          <span>{value[key]}</span>
        </div>
      ))}
    </div>
  ) : (
    value
  )

const InfoField: FC<Props> = ({
  item = {},
  isRow,
  fullWidth = false,
  children,
}) => (
  <CCol
    md={fullWidth || isRow ? '12' : '3'}
    sm={fullWidth || isRow ? '12' : '6'}
    lg={fullWidth || isRow ? '12' : '3'}
    className={styles.infoField}
  >
    <CCard>
      {item.title && !isRow && <h5>{item.title}</h5>}
      {children ? (
        <CRow>
          {item.title && isRow && <CCol md="4">{item.title}</CCol>}
          <CCol>{children}</CCol>
        </CRow>
      ) : (
        <CRow>
          {isRow && <CCol md="4">{item.title}</CCol>}
          <CCol md={isRow && '8'}>
            {item.value && (
              <span>
                {item.isDate
                  ? moment(item.value).format('LLL')
                  : handleValue(item.value)}
              </span>
            )}
            {item.onClick && (
              <Button
                className={styles.innerButton}
                text={item.text || ''}
                color="secondary"
                onClick={item.onClick}
              />
            )}
            {item.status && (
              <CBadge
                className={styles.innerBadge}
                color={getBadge(item.status)}
              >
                {item.status}
              </CBadge>
            )}
          </CCol>
        </CRow>
      )}
    </CCard>
  </CCol>
)

export default InfoField
