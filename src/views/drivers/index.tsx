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
  { onClick: () => console.log('clicked'), type: 'add', path: '/add-driver' },
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
    id: '63582121',
    name: 'John',
    username: 'driver12',
    phoneNumber: '09124521287',
    city: 'Tehran',
    createdAt: '5/18/2021',
    currentLocation: 'location',
    type: 'grocaries',
    status: 'at work',
  },
  {
    id: '63582121',
    username: 'driver123',
    name: 'Jack',
    city: 'Essen',
    createdAt: '5/18/2021',
    phoneNumber: '09124521287',
    currentLocation: 'location',
    type: 'suspend',
    status: 'at work',
  },
]

const rowActions = [
  { label: 'View', onClick: () => console.log('clicked'), disabled: true },
  { label: 'Delete', onClick: () => console.log('clicked'), disabled: true },
]

const Customers: FC = () => {
  useEffect(() => {
    comingSoonAlert()
  })
  return (
    <>
      <CRow>
        <CCol lg="12">
          <Table
            header="List of Customers"
            headerActions={tableActions}
            rowActions={rowActions}
            // filterItems={filterItems}
            data={tableData}
            fields={tablesFields.drivers}
            className="noBorder"
            viewActionPath="driver"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Customers
