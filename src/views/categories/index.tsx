// modules
import { FC, useEffect, useState } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Stats, Table } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
//queries
import { getCategoriesReq, deleteSingleCategory } from 'src/queries/categories'
// helpers
import { paginationHandler } from 'src/helpers/functions'
import { deleteItemAlert } from 'src/helpers/alerts'

const Categories: FC = () => {
  const [categories, setCategories] = useState({ total: 0, result: [] })
  const [selectedItems, setSelectedItems] = useState([])
  const [activePage, setActivePage] = useState(1)

  const getData = (params = {}, resetPage = true) => {
    getCategoriesReq(params).then(({ result, total }) => {
      setCategories({
        total,
        result,
      })
      if (resetPage) setActivePage(1)
    })
  }

  const tableActions = [
    {
      onClick: () => console.log('clicked'),
      type: 'add',
      path: '/add-category/new',
    },
    // {
    //   type:
    //     selectedItems.length === categories.result.length
    //       ? 'unselectAll'
    //       : 'selectAll',
    //   onClick: () => {
    //     selectedItems.length === categories.result.length
    //       ? setSelectedItems([])
    //       : setSelectedItems(categories.result.map(({ id }) => id))
    //   },
    // },
    // { onClick: () => console.log('clicked'), type: 'changeStatus' },
  ]

  const rowActions = [
    { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-category',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteSingleCategory, id, getData),
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {/* <CRow>
        <CCol xs="12">
          <Stats items={items} />
        </CCol>
      </CRow> */}
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="List of Categories"
              headerActions={tableActions}
              rowActions={rowActions}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              viewActionPath="category"
              data={categories.result}
              fields={tablesFields.categories}
              className="noBorder"
              total={categories.total}
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

export default Categories
