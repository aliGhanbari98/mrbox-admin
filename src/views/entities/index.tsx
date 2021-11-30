// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'
// queries
import { getEntitiesReq, deleteSingleEntity } from 'src/queries/entities'

const tableActions = [
  {
    onClick: () => console.log('clicked'),
    type: 'add',
    path: '/add-entity/new',
  },
]

const Entities: FC = () => {
  const [entities, setEntities] = useState({ result: [], total: 0 })

  const getData = (params = {}) => {
    getEntitiesReq(params).then(({ result, total }) => {
      console.log(result)
      setEntities({
        total,
        result,
      })
    })
  }

  const rowActions = [
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-entity',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteSingleEntity, id, getData),
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
            header="List of Entities"
            rowActions={rowActions}
            data={entities.result}
            headerActions={tableActions}
            fields={tablesFields.entities}
            total={entities.total}
            onPageChange={(page) =>
              paginationHandler({ getData, page, limit: 10 })
            }
            className="noBorder"
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Entities
