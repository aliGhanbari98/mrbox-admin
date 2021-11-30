// modules
import { FC, useState } from 'react'
// components
import {
  CRow,
  CCol,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { Table, TextField, Button, CreatableSelect } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'

// style
import styles from './index.module.scss'

interface Item {
  key: string
  value: any
  onClick: any
  default?: boolean
}

interface Props {
  items: Array<Item>
}

const Stats: FC<Props> = ({ items = [] }) => {
  const [active, setAttKey] = useState('2')

  return (
    <CTabs activeTab={items[0] && items[0].value}>
      <CNav variant="tabs">
        {items.map(({ key, value, onClick }, index) => (
          <CNavItem key={index} onClick={() => onClick(value)}>
            <CNavLink data-tab={value}>{key}</CNavLink>
          </CNavItem>
        ))}
      </CNav>
      {/* <CTabContent>
        {items.map(({ key, value, onClick }, index) => (
          <CTabPane key={index}>{value}</CTabPane>
        ))}
      </CTabContent> */}
    </CTabs>
  )
}

export default Stats
