// modules
import { FC } from 'react'
// components
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetIcon,
  CWidgetProgress,
  CProgress,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
// style
import styles from './index.module.scss'

interface Item {
  title: string
  value: any
  color?: string
}

interface Props {
  items: Array<Item>
}

const Stats: FC<Props> = ({ items }) => (
  <CRow>
    {items.map(({ title, value, color = 'info' }, index) => (
      <CCol key={index} lg="3">
        <CWidgetProgress
          header={value}
          inverse
          color={color}
          text={title}
          className={styles.widget}
        />
      </CCol>
      /* <CCard className={styles.card}>
          <CCardHeader className={styles.header}>
            <h6>{title}</h6>
          </CCardHeader>
          <CCardBody>
            <div className={styles.value}>
              <h3>{value}</h3>
            </div>
          </CCardBody>
        </CCard> */
    ))}
  </CRow>
)

export default Stats
