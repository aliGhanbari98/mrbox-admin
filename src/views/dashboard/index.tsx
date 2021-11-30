// modules
import { FC, useEffect, useState } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CButtonGroup } from '@coreui/react'
import { Stats, Table, Button } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import MainChartExample from '../charts/MainChartExample.js'
// queries
import {
  getDashboardChartReq,
  getDashboardOrdersReq,
  getDashboardProductsReq,
  getDashboardStatistics,
  getDashboardVendorsReq,
} from 'src/queries/dashboard'

const productsData = [
  {
    id: '123455',
    thumbnail: 'this is a test thumbnail',
    vendor: 'vendor name',
    first_name: 'asus',
    last_name: 'N501',
    price: 5000,
  },
  {
    id: '123455',
    thumbnail: 'this is a test thumbnail',
    vendor: 'vendor name',
    first_name: 'asus',
    last_name: 'N501',
    price: 5000,
  },
  {
    id: '123455',
    thumbnail: 'this is a test thumbnail',
    vendor: 'vendor name',
    first_name: 'N501',
    last_name: 'N501',
    price: 5000,
  },
]

const vendorsData = [
  {
    id: '12345',
    logo: '/images/vendor-logo.jpg',
    first_name: 'asus',
    last_name: 'N501',
    listedDate: '13/4/2019',
    lastLogin: '13/4/2019',
    licenseExpiredAt: '13/4/2019',
    status: 'active',
  },
  {
    id: '12345',
    logo: '/images/vendor-logo.jpg',
    first_name: 'asus',
    last_name: 'N501',
    listedDate: '13/4/2019',
    lastLogin: '13/4/2019',
    licenseExpiredAt: '13/4/2019',
    status: 'active',
  },
  {
    id: '12345',
    logo: '/images/vendor-logo.jpg',
    first_name: 'asus N501',
    last_name: 'asus N501',
    listedDate: '13/4/2019',
    lastLogin: '13/4/2019',
    licenseExpiredAt: '13/4/2019',
    status: 'active',
  },
]

const ordersData = [
  {
    id: '123',
    vendor: 'vendor name',
    date: '08/03/2015',
    customerName: 'John',
    totalItems: 10,
    createTime: '12/2/2021',
    totalPrice: '2000',
    discount: 54,
    status: 'pending',
  },
  {
    id: '123',
    vendor: 'vendor name',
    date: '08/03/2015',
    customerName: 'John',
    totalItems: 10,
    createTime: '12/2/2021',
    totalPrice: '2000',
    discount: 54,
    status: 'pending',
  },
  {
    id: '123',
    vendor: 'vendor name',
    date: '08/03/2015',
    customerName: 'John',
    totalItems: 10,
    createTime: '12/2/2021',
    totalPrice: '2000',
    discount: 54,
    status: 'pending',
  },
]

const Dashboard: FC = () => {
  const [stats, setStats] = useState([{ title: '', value: 0, color: '' }])
  const [chart, setChart] = useState([])
  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    Promise.all([
      getDashboardStatistics({}).then(
        ({ total_customers, total_orders, total_products, total_vendors }) =>
          setStats([
            {
              title: 'Total Customers',
              value: total_customers,
              color: 'primary',
            },
            { title: 'Total Vendors', value: total_vendors, color: 'success' },
            {
              title: 'Total Products',
              value: total_products,
              color: 'warning',
            },
            { title: 'Total Orders', value: total_orders, color: 'primary' },
          ])
      ),
      getDashboardChartReq({}).then(({ result }) => setChart(result)),
      getDashboardProductsReq({}).then(({ result }) => setProducts(result)),
      getDashboardVendorsReq({}).then(({ result }) => setVendors(result)),
      getDashboardOrdersReq({}).then(({ result }) => setOrders(result)),
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
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Sales Chart
                  </h4>
                  {/* <div className="small text-muted">November 2017</div> */}
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <CButtonGroup className="float-right mr-3">
                    {['Day', 'Week', 'Month'].map((value) => (
                      <Button
                        onClick={console.log()}
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </Button>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <MainChartExample
                style={{ height: '300px', marginTop: '40px' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="Top Vendors"
              data={vendorsData}
              fields={tablesFields.dashboardVendors}
              viewActionPath="product"
              className="noBorder"
              pagination={false}
            />
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="Top Products"
              data={productsData}
              fields={tablesFields.topProducts}
              viewActionPath="product"
              className="noBorder"
              pagination={false}
            />
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="Sold out Products"
              data={productsData}
              fields={tablesFields.soldOutProducts}
              viewActionPath="product"
              className="noBorder"
              pagination={false}
            />
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="Orders"
              data={ordersData}
              fields={tablesFields.dashboardOrders}
              viewActionPath="order"
              className="noBorder"
              pagination={false}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
