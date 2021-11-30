// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getShippingsReq, DeleteSingleShipping } from 'src/queries/shipping'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-shipping/new',
  },
]

const Shipping: FC = () => {
  const [shippingsData, setShippingsData] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) =>
    getShippingsReq(params).then(({ total, result }) => {
      console.log(result)
      setShippingsData({
        total,
        result,
      })
      if (resetPage) setActivePage(1)
    })

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-shipping',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(DeleteSingleShipping, id, getData),
    },
    // { label: 'Active', onClick: () => console.log('clicked') },
    // { label: 'Disable', onClick: () => console.log('clicked') },
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="List of SHippings"
              rowActions={rowActions}
              headerActions={tableActions}
              data={shippingsData.result}
              fields={tablesFields.shippings}
              className="noBorder"
              total={shippingsData.total}
              activePage={activePage}
              onPageChange={(page) =>
                paginationHandler({ getData, setActivePage, page, limit: 10 })
              }
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Shipping
