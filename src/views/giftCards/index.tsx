// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getGiftsReq, deleteBulkGifts } from 'src/queries/gifts'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const actions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-giftcard/new',
  },
]

const GiftCards: FC = () => {
  const [giftsDate, setgiftsDate] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) =>
    getGiftsReq(params).then(({ total, result }) => {
      console.log(result)
      setgiftsDate({
        total,
        result: result.map(({ name, ...rest }) => ({ title: name, ...rest })),
      })
      if (resetPage) setActivePage(1)
    })

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-giftcard',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteBulkGifts, [id], getData),
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
              header="List of Gift Cards"
              rowActions={rowActions}
              headerActions={actions}
              data={giftsDate.result}
              fields={tablesFields.giftCards}
              className="noBorder"
              total={giftsDate.total}
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

export default GiftCards
