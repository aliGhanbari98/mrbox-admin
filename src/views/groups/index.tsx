// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// queries
import { getGroupsReq, deleteSingleGroup } from 'src/queries/groups'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-group/new',
  },
]

const Groups: FC = () => {
  const [groups, setGroups] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) => {
    getGroupsReq(params).then(({ result, total }) => {
      setGroups({
        total,
        result: result.map((item) => ({ title: item.name, ...item })),
      })
      if (resetPage) setActivePage(1)
    })
  }

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-group',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteSingleGroup, id, getData),
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <CRow>
      <CCol lg="12">
        <CCard>
          <Table
            header="List of Groups"
            rowActions={rowActions}
            data={groups.result}
            headerActions={tableActions}
            fields={tablesFields.groups}
            viewActionPath="product"
            className="noBorder"
            total={groups.total}
            activePage={activePage}
            onPageChange={(page) =>
              paginationHandler({ getData, setActivePage, page, limit: 10 })
            }
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Groups
