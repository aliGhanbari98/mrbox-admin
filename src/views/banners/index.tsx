// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Stats, Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import {
  getBannersReq,
  getBannersStatistics,
  deleteSingleBanner,
} from 'src/queries/banners'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-banner/new',
  },
  // { onClick: () => console.log('clicked'), type: 'changeStatus' },
]

const Banners: FC = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [bannersData, setBannersData] = useState({ total: 0, result: [] })
  const [stats, setStats] = useState([{ title: '', value: 0, color: '' }])

  const getData = (params = {}) => {
    getBannersReq(params).then(({ result, total }) => {
      setBannersData({
        total,
        result: result.map(({ name, promotion_id, target_url, ...rest }) => {
          return { title: name, target: target_url || promotion_id, ...rest }
        }),
      })
    })
  }

  const rowActions = [
    { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-banner',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteSingleBanner, id, getData),
    },
    // { label: 'Disable/Enable', onClick: () => console.log('clicked') },
  ]

  useEffect(() => {
    getData()
    Promise.all([
      getBannersStatistics(null).then(
        ({ total_active, total_banners, total_clicks }) =>
          setStats([
            { title: 'Total Banners', value: total_banners, color: 'primary' },
            { title: 'Total Active', value: total_active, color: 'success' },
            { title: 'Total Clicks', value: total_clicks, color: 'warning' },
          ])
      ),
    ])
  }, [])

  return (
    <>
      <CRow>
        <CCol xs="12">
          <Stats items={stats} />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="List of Banners"
              headerActions={tableActions}
              setSelectedItems={setSelectedItems}
              rowActions={rowActions}
              viewActionPath="banner"
              data={bannersData.result}
              fields={tablesFields.banners}
              total={bannersData.total}
              onPageChange={(page) =>
                paginationHandler({ getData, page, limit: 10 })
              }
              className="noBorder"
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Banners
