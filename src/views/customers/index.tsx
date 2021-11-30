// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol } from '@coreui/react'
import { Stats, Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getCustomersReq, getCustomersStatistics } from 'src/queries/customers'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { comingSoonAlert } from 'src/helpers/alerts'

const items = [
  { title: 'Total Customers', value: 4000, color: 'secondary' },
  { title: 'Just joined', value: 200, color: 'success' },
  { title: 'Active in last 7 days', value: 3000, color: 'info' },
  { title: 'Active in last 30 days', value: 100, color: 'warning' },
  { title: 'InActive - more than 30 days', value: 20, color: 'danger' },
]

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-customer/new',
    disabled: true,
  },
  { onClick: () => console.log('clicked'), type: 'filter' },
  { onClick: () => console.log('clicked'), type: 'export' },
]

const filterItems = [
  { label: 'Name', onChange: () => console.log('changing') },
  { label: 'Email', onChange: () => console.log('changing') },
  { label: 'Phone', onChange: () => console.log('changing') },
  {
    label: 'Country',
    onChange: () => console.log('changing'),
    type: 'select',
    options: [],
  },
  {
    label: 'Status',
    onChange: () => console.log('changing'),
    type: 'select',
    options: [],
  },
]

const Customers: FC = () => {
  const [customersData, setCustomersData] = useState({ total: 0, result: [] })
  // const [stats, setStats] = useState([{ title: '', value: 0, color: '' }])

  const rowActions = [
    { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-customer',
      disabled: true,
    },
    { label: 'Block', onClick: () => console.log('clicked'), disabled: true },
    { label: 'Delete', onClick: () => console.log('clicked'), disabled: true },
  ]

  const getData = (params = {}) => {
    comingSoonAlert()
    // getCustomersReq(params).then(({ result, total }) => {
    //   setCustomersData({
    //     total,
    //     result,
    //   })
    // })
  }

  useEffect(() => {
    getData()
    // Promise.all([
    //   getCustomersStatistics(null).then((result) => {
    //     console.log(result)
    //     setStats([
    //       { title: 'Total Banners', value: total_banners, color: 'primary' },
    //       { title: 'Total Active', value: total_active, color: 'success' },
    //       { title: 'Total Clicks', value: total_clicks, color: 'warning' },
    //     ])
    //   }),
    // ])
  }, [])
  return (
    <>
      <CRow>
        <CCol xs="12">
          <Stats items={items} />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <Table
            header="List of Customers"
            headerActions={tableActions}
            rowActions={rowActions}
            filterItems={filterItems}
            data={customersData.result}
            fields={tablesFields.customers}
            className="noBorder"
            viewActionPath="customer"
            total={customersData.total}
            onPageChange={(page) =>
              paginationHandler({ getData, page, limit: 10 })
            }
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Customers
