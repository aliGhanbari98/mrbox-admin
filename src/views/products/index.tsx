// modules
import { FC, useState, useEffect } from 'react'
// components
import { CRow, CCol, CCard } from '@coreui/react'
import { Stats, Table } from 'src/components'
import ImportCSV from '../../components/importCSV'
// constants
import statuses from 'src/constants/status'
import tablesFields from 'src/constants/tablesFields'
// helpers
import { paginationHandler, convertToSelectOption } from 'src/helpers/functions'
import filteringHandler from 'src/helpers/filteringHandler'
import { deleteItemAlert } from 'src/helpers/alerts'
import { useToggle, useObjectData } from '../../helpers/hooks'
// queries
import {
  getProductsReq,
  getProductsStatistics,
  deleteProductReq,
  changeProductsStatus,
} from 'src/queries/products'
import { getOnlyVendorsReq } from 'src/queries/vendors'

const Products: FC = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [stats, setStats] = useState([{ title: '', value: 0, color: '' }])
  const [products, setProducts] = useState({ result: [], total: 0 })
  const [activePage, setActivePage] = useState(1)
  const [vendorsOptions, setVendorsOptions] = useState([{}])
  const { value: importModal, toggle: toggleImportModal } = useToggle(false)
  const { data: filterParams, setField: setFilterParam } = useObjectData({
    vendor_id: '',
    status: '',
    price_gt: 0,
    price_lt: 0,
  })
  const [descSortValue, setDescSortValue] = useState({
    label: '',
    value: '',
  })
  const [ascSortValue, setAscSortValue] = useState({
    label: '',
    value: '',
  })

  const getData = (params = {}, resetPage = true) => {
    filteringHandler({
      query: getProductsReq,
      params,
      filters: filterParams,
    }).then(({ result, total }) => {
      setProducts({
        total,
        result,
      })
      if (resetPage) setActivePage(1)
    })
  }

  const filterItems = [
    {
      label: 'Vendor',
      type: 'select',
      isMulti: false,
      onChange: ({ id }) => setFilterParam('vendor_id', id),
      options: [{ label: 'All', value: '' }, ...vendorsOptions],
    },
    {
      label: 'Status',
      onChange: ({ value }) => setFilterParam('status', value),
      type: 'select',
      isMulti: false,
      options: [{ label: 'All', value: '' }, ...statuses.product],
    },
    {
      label: 'Price GT',
      onChange: (value) => setFilterParam('price_gt', value),
    },
    {
      label: 'Price LT',
      onChange: (value) => setFilterParam('price_sm', value),
    },
    {
      label: 'Desc Sort',
      type: 'select',
      isMulti: false,
      options: [
        { label: 'All', value: '' },
        { label: 'Create Datetime', value: 'create_datetime' },
        { label: 'Update Datetime', value: 'update_datetime' },
      ],
      value: descSortValue.label ? descSortValue : null,
      onChange: ({ value }) => {
        setFilterParam('sort_by', `desc(${value})`)
        setDescSortValue({ label: value.replace('_', ' '), value })
        setAscSortValue({ label: '', value: '' })
      },
    },
    {
      label: 'Asc Sort',
      type: 'select',
      isMulti: false,
      options: [
        { label: 'All', value: '' },
        { label: 'Create Datetime', value: 'create_datetime' },
        { label: 'Update Datetime', value: 'update_datetime' },
      ],
      value: ascSortValue.label ? ascSortValue : null,
      onChange: ({ value }) => {
        setFilterParam('sort_by', `asc(${value})`)
        setAscSortValue({ label: value.replace('_', ' '), value })
        setDescSortValue({ label: '', value: '' })
      },
    },
  ]

  const tableActions = [
    {
      onClick: () => console.log('clicked'),
      type: 'add',
      path: '/add-product/new',
    },
    { onClick: () => console.log('clicked'), type: 'changeStatus' },
    {
      type:
        selectedItems.length === products.result.length
          ? 'unselectAll'
          : 'selectAll',
      onClick: () => {
        selectedItems.length === products.result.length
          ? setSelectedItems([])
          : setSelectedItems(products.result.map(({ id }) => id))
      },
    },
    { onClick: () => console.log('clicked'), type: 'filter' },
    { onClick: () => console.log('clicked'), type: 'export' },
    {
      onClick: () => {
        toggleImportModal()
      },
      type: 'import',
      disabled: true,
    },
  ]

  const rowActions = [
    { label: 'View', onClick: () => console.log('clicked') },
    {
      label: 'Edit',
      onClick: () => console.log('clicked'),
      path: '/add-product',
    },
    {
      label: 'Delete',
      onClick: (id) => deleteItemAlert(deleteProductReq, id, getData),
    },
  ]

  const onChangeStatus = (status) => {
    changeProductsStatus({ products_ids: selectedItems, status })
    getData()
  }

  useEffect(() => {
    getData()
    Promise.all([
      getProductsStatistics({}).then(
        ({
          total_products,
          total_published,
          total_running_out,
          total_sold_out,
        }) => {
          setStats([
            {
              title: 'Total Products',
              value: total_products,
              color: 'primary',
            },
            { title: 'Sold Out', value: total_sold_out, color: 'success' },
            { title: 'Published', value: total_published, color: 'warning' },
            { title: 'Running out', value: total_running_out, color: 'danger' },
          ])
        }
      ),
      getOnlyVendorsReq({}).then(({ result }) =>
        setVendorsOptions(convertToSelectOption(result))
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
              header="List of Products"
              rowActions={rowActions}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              data={products.result}
              headerActions={tableActions}
              filterItems={filterItems}
              onFilterClick={() => getData()}
              statusOptionsKey="product"
              onChangeStatus={onChangeStatus}
              fields={tablesFields.products}
              viewActionPath="product"
              className="noBorder"
              activePage={activePage}
              total={products.total}
              onPageChange={(page) =>
                paginationHandler({ getData, setActivePage, page, limit: 10 })
              }
            />
          </CCard>
        </CCol>
      </CRow>
      {importModal && (
        <ImportCSV isOpen={importModal} toggle={toggleImportModal} />
      )}
    </>
  )
}

export default Products
