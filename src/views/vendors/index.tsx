// modules
import { FC, useEffect, useState } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// quries
import { getOnlyVendorsReq, updateBulkVendors } from 'src/queries/vendors'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { updateStatusAlert } from 'src/helpers/alerts'

const filterItems = [
  { label: 'Vendor Name', onChange: () => console.log('changing') },
  { label: 'Vendor Id', onChange: () => console.log('changing') },
  {
    label: 'Status',
    onChange: () => console.log('changing'),
    type: 'select',
    options: [],
  },
]

const rowActions = [
  { label: 'View', onClick: () => console.log('clicked') },
  {
    onClick: () => console.log('clicked'),
    label: 'Edit',
    path: '/add-vendor',
  },
]

const Vendors: FC = () => {
  const [vendors, setVendors] = useState({ result: [], total: 0 })
  const [selectedItems, setSelectedItems] = useState([])
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) => {
    getOnlyVendorsReq(params).then(({ result, total }) => {
      setVendors({
        total,
        result: result.map(({ logo_file_id, ...rest }) => ({
          ...rest,
          logo: logo_file_id,
        })),
      })
      if (resetPage) setActivePage(1)
    })
  }

  const tableActions = [
    {
      onClick: () => console.log('clicked'),
      type: 'add',
      path: '/add-vendor/new',
    },
    {
      type:
        selectedItems.length === vendors.result.length
          ? 'unselectAll'
          : 'selectAll',
      onClick: () => {
        selectedItems.length === vendors.result.length
          ? setSelectedItems([])
          : setSelectedItems(vendors.result.map(({ id }) => id))
      },
    },
    // { onClick: () => console.log('clicked'), type: 'filter' },
    { onClick: () => console.log('clicked'), type: 'changeStatus' },
  ]

  const onChangeStatus = (status) => {
    updateBulkVendors({ ids: selectedItems, status })
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <CRow>
      <CCol lg="12">
        <CCard>
          <Table
            header="List of Vendors"
            data={vendors.result}
            rowActions={rowActions}
            viewActionPath="vendor"
            statusOptionsKey="vendor"
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onChangeStatus={onChangeStatus}
            fields={tablesFields.vendors}
            headerActions={tableActions}
            filterItems={filterItems}
            total={vendors.total}
            activePage={activePage}
            onPageChange={(page) =>
              paginationHandler({ getData, setActivePage, page, limit: 10 })
            }
            className="noBorder"
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Vendors
