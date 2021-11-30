// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getCouponsReq, deleteBulkCoupons } from 'src/queries/coupons'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-coupon/new',
  },
]

const Coupons: FC = () => {
  const [couponsData, setCouponsData] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) =>
    getCouponsReq(params).then(({ total, result }) => {
      setCouponsData({
        total,
        result: result.map((item) => ({
          ...item,
          title: item.name,
        })),
      })
      if (resetPage) setActivePage(1)
    })

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-coupon',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteBulkCoupons, [id], getData),
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
              header="List of Coupons"
              rowActions={rowActions}
              headerActions={tableActions}
              data={couponsData.result}
              fields={tablesFields.coupons}
              className="noBorder"
              total={couponsData.total}
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

export default Coupons
