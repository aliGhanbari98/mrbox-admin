// modules
import { FC, useEffect } from 'react'
// components
import { CRow, CCol } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// helpers
import { comingSoonAlert } from 'src/helpers/alerts'

const items = [
  { title: 'Total Customers', value: 4000, color: 'secondary' },
  { title: 'Just joined', value: 200, color: 'success' },
  { title: 'Active in last 7 days', value: 3000, color: 'info' },
  { title: 'Active in last 30 days', value: 100, color: 'warning' },
  { title: 'InActive - more than 30 days', value: 20, color: 'danger' },
]

const tableActions = [
  { onClick: () => console.log('clicked'), type: 'add', path: '/add-admin' },
]

const filterItems = [
  { label: 'Name', onChange: () => console.log('changing') },
  { label: 'Email', onChange: () => console.log('changing') },
  { label: 'Phone', onChange: () => console.log('changing') },
  {
    label: 'Status',
    onChange: () => console.log('changing'),
    type: 'select',
    options: [],
  },
]

const tableData = [
  {
    firstName: 'Michael',
    lastName: 'Rivandi',
    type: 'Super Admin',
    gender: 'Male',
    phoneNumber: '09124521287',
    address: 'Germany, Frankfurt, ST1',
    status: 'Pending',
  },
  {
    firstName: 'Michael',
    lastName: 'Rivandi',
    type: 'Finance',
    gender: 'Male',
    phoneNumber: '09124521287',
    address: 'Germany, Frankfurt, ST1',
    status: 'Pending',
  },
]

const rowActions = [
  { label: 'View', onClick: () => console.log('clicked'), disalbed: true },
  { label: 'Delete', onClick: () => console.log('clicked'), disabled: true },
]

const Admins: FC = () => {
  useEffect(() => {
    comingSoonAlert()
  })

  return (
    <CRow>
      <CCol lg="12">
        <Table
          header="List of Admins"
          headerActions={tableActions}
          rowActions={rowActions}
          // filterItems={filterItems}
          data={tableData}
          fields={tablesFields.admins}
          className="noBorder"
          viewActionPath="driver"
        />
      </CCol>
    </CRow>
  )
}

export default Admins
