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
import {getCsvFieldsReq, getCsvPerCategoryReq} from "../../queries/csv-fields";

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/csv-fields/new',
  },
  // { onClick: () => console.log('clicked'), type: 'changeStatus' },
]

const CSVFields: FC = () => {
  const [csvData, setCsvData] = useState({ total: 0, result: [] })

  const getData = (params = {}) => {
    getCsvPerCategoryReq(params).then(({ result, total }) => {
      setCsvData({
        total,
        result: result.map(item => ({...item, id: item.cat_id}))
      })
    })
  }

  const rowActions = [
    // { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/csv-fields',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteSingleBanner, id, getData),
    },
    // { label: 'Disable/Enable', onClick: () => console.log('clicked') },
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
              header="List of CSVs"
              headerActions={tableActions}
              rowActions={rowActions}
              viewActionPath="csv"
              data={csvData.result}
              fields={tablesFields.csvFields}
              total={csvData.total}
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

export default CSVFields;
