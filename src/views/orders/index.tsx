// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table, Actions } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// helpers
import { comingSoonAlert } from 'src/helpers/alerts'

const items = [
  { title: 'Total Banners', value: 4000 },
  { title: 'Total Active', value: 200 },
  { title: 'Total Hit', value: 3000 },
]

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'delete',
  },
  { onClick: () => console.log('clicked'), type: 'changeStatus' },
]

const rowActions = [
  { label: 'View', onClick: () => console.log('clicked'), disabled: true },
  { label: 'Cancel', onClick: () => console.log('clicked'), disabled: true },
]

const tableData = [
  {
    id: '12345',
    date: '12/4/2019',
    vendor: 'farshad',
    customerName: 'Ali',
    totalItems: 100,
    createTime: '19/6/2018',
    totalPrice: 20000,
    discount: 100,
    status: 'pending',
  },
]

const Orders: FC = () => {
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    comingSoonAlert()
  })

  return (
    <>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="List of Orders"
              headerActions={tableActions}
              setSelectedItems={setSelectedItems}
              viewActionPath="order"
              rowActions={rowActions}
              data={tableData}
              fields={tablesFields.orders}
              className="noBorder"
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Orders
