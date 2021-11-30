// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import { CRow, CCol } from '@coreui/react'
import { InfoField, Table, Image, Card, Stats } from 'src/components'
// queries
import { getSingleCustomerReq } from 'src/queries/customers'
// helpers
import { useObjectData } from 'src/helpers/hooks'

const ordersHistoryData = [
  {
    id: 1,
    date: '15/7/2017',
    total: 1000,
    totalPrice: 20000,
    status: 'pending',
  },
  {
    id: 1,
    date: '15/7/2017',
    total: 1000,
    totalPrice: 20000,
    status: 'pending',
  },
  {
    id: 1,
    date: '15/7/2017',
    total: 1000,
    totalPrice: 20000,
    status: 'Active',
  },
  {
    id: 1,
    date: '15/7/2017',
    total: 1000,
    totalPrice: 20000,
    status: 'Banned',
  },
]

const logsData = [
  {
    dateTime: '15/7/2017',
    description: 'This is a test description',
  },
  {
    dateTime: '15/7/2017',
    description: 'This is a test description',
  },
  {
    dateTime: '15/7/2017',
    description: 'This is a test description',
  },
  {
    dateTime: '15/7/2017',
    description: 'This is a test description',
  },
]

const wishListData = [
  {
    id: '123455',
    name: 'test product',
    thumbNail: 'thumb nail',
    addDate: '12/2/2021',
  },
  {
    id: '123455',
    name: 'test product',
    thumbNail: 'thumb nail',
    addDate: '12/2/2021',
  },
  {
    id: '123455',
    name: 'test product',
    thumbNail: 'thumb nail',
    addDate: '12/2/2021',
  },
  {
    id: '123455',
    name: 'test product',
    thumbNail: 'thumb nail',
    addDate: '12/2/2021',
  },
]

const statsItems = [
  { title: 'Total Orders', value: 500 },
  { title: 'Total Spent', value: 5000, color: 'success' },
  { title: 'Rewards', value: 5000, color: 'warning' },
  { title: 'Avg Ratse', value: 5000 },
  { title: 'Wallet amount', value: 5000, color: 'danger' },
]

const actions = [
  { onClick: () => console.log('clicked'), type: 'edit' },
  { onClick: () => console.log('clicked'), type: 'delete' },
  {
    onClick: () => console.log('block'),
    type: 'block',
  },
]

const SingleCustoemr: FC = () => {
  const { id } = useParams()
  const { data: customerData, setState: setCustomerData } = useObjectData({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    is_enbale: true,
    password: '',
    national_code: '',
    addresses: [],
    avatar: '',
    date_of_birth: '',
    gender: '',
    groups: [],
    is_blocked: false,
    is_force_change_login: false,
    is_force_login: false,
    permissions: [],
    settings: {},
    telephone: '',
    wallet_amount: 0,
    user_status: '',
    rewards: 0,
  })

  useEffect(() => {
    //get user data by id here
    getSingleCustomerReq(id).then(setCustomerData)
  }, [])

  return (
    <>
      <Stats items={statsItems} />
      <CRow>
        <CCol>
          <Card header="Information" headerActions={actions}>
            <CRow>
              <InfoField
                item={{ title: 'Status', value: customerData.user_status }}
              />
              <InfoField
                item={{
                  title: 'Name',
                  value: `${customerData.first_name} ${customerData.last_name}`,
                }}
              />
              <InfoField
                item={{
                  title: 'Phone Number',
                  value: customerData.mobile_number,
                }}
              />
              <InfoField
                item={{
                  title: 'Email Address',
                  value: customerData.email,
                }}
              />
              <InfoField
                item={{
                  title: 'DOB',
                  value: customerData.date_of_birth,
                }}
              />
              <InfoField
                item={{
                  title: 'Language',
                  value: customerData.settings.language,
                }}
              />
              <InfoField
                item={{
                  title: 'Country',
                  value: customerData.settings.country_code,
                }}
              />
              <InfoField
                item={{
                  title: 'Gender',
                  value: customerData.gender,
                }}
              />
              {/* <InfoField
                item={{
                  title: 'Joined Date',
                  value: '5/10/2021',
                }}
              /> */}
              <InfoField
                item={{
                  title: 'Avatar',
                }}
              >
                <Image alt="avatar" url={customerData.avatar} />
              </InfoField>
            </CRow>
            <CRow>
              <CCol>
                <Table
                  header="Addresses"
                  fields={tablesFields.addressList}
                  data={customerData.addresses}
                  pagination={false}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <InfoField
                  item={{
                    text: 'Change Password',
                    onClick: () => console.log('changing passsword'),
                  }}
                />
              </CCol>
            </CRow>
          </Card>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <Table
            header="Orders History"
            className="noBorder"
            viewActionPath="order"
            fields={tablesFields.ordersHisotry}
            data={ordersHistoryData}
            pagination={false}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <Table
            header="Logs"
            className="noBorder"
            fields={tablesFields.logs}
            pagination={false}
            data={logsData}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <Table
            header="Wish List"
            className="noBorder"
            fields={tablesFields.wishList}
            pagination={false}
            data={wishListData}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default SingleCustoemr
