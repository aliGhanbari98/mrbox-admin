// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'
import { getBrandsReq, deleteBulkBrands } from '../../queries/brands'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-brand/new',
  },
  // { onClick: () => console.log('clicked'), type: 'changeStatus' },
]

const Brands: FC = () => {
  const [brandsData, setBrandsData] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) => {
    getBrandsReq({ params }).then(({ total, result }) => {
      setBrandsData({
        total,
        result: result.map((item) => ({ ...item, title: item.name })),
      })
      if (resetPage) setActivePage(1)
    })
  }

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-brand',
    },
    {
      label: 'Delete',
      onClick: (id) =>
        deleteItemAlert(deleteBulkBrands, { names: [id] }, getData),
    },
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
              header="List of Brands"
              headerActions={tableActions}
              rowActions={rowActions}
              data={brandsData.result}
              viewActionPath="brands"
              fields={tablesFields.brandsEntity}
              className="noBorder"
              total={brandsData.total}
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

export default Brands
