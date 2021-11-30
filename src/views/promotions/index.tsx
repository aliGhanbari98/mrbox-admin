// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getPromotionsReq, deleteBulkPromotions } from 'src/queries/promotions'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-promotion/new',
  },
  // { onClick: () => console.log('clicked'), type: 'changeStatus' },
]

const Promotions: FC = () => {
  const [promotionsData, setPromotionsData] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) => {
    getPromotionsReq(params).then(({ total, result }) => {
      setPromotionsData({
        total,
        result: result.map((item) => ({
          ...item,
          title: item.name,
          target: item.target.type,
        })),
      })
      if (resetPage) setActivePage(1)
    })
  }

  const rowActions = [
    { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-promotion',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteBulkPromotions, [id], getData),
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
              header="List of Promotions"
              headerActions={tableActions}
              rowActions={rowActions}
              data={promotionsData.result}
              viewActionPath="promotion"
              fields={tablesFields.promotions}
              className="noBorder"
              total={promotionsData.total}
              activePage={activePage}
              onPageChange={(page) =>
                paginationHandler({ getData, page, setActivePage, limit: 10 })
              }
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Promotions
