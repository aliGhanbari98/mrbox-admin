// modules
import { FC } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Button, Modal } from 'src/components'
// style
import styles from './index.module.scss'

interface Item {
  text: string
  onClick: any
  modalComponent?: any
}

interface Props {
  items: Array<Item>
  noHeader?: boolean
}

const Actions: FC<Props> = ({ items, noHeader }) => (
  <CCard className={noHeader ? 'noBorder' : ''}>
    {!noHeader && <CCardHeader>Actions</CCardHeader>}
    <CCardBody>
      <CRow>
        {items.map((item, index) => (
          <CCol
            className={styles.buttonContainer}
            key={index}
            xs="6"
            sm="4"
            md=""
          >
            <Button {...item} />
          </CCol>
        ))}
      </CRow>
    </CCardBody>
  </CCard>
)

export default Actions
