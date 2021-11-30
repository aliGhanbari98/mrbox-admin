// modules
import { FC, useEffect, useState } from 'react'
// components
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { InfoField, Table, Card, Image } from 'src/components'
// helpers
import tablesFields from 'src/constants/tablesFields'
// styles
import styles from './index.module.scss'

const tableData = [{ totalPrice: 56310, discount: 2900, totalPaid: 3764 }]

const actions = [{ onClick: () => console.log('clicked'), type: 'cancel' }]

const SingleOrder: FC = () => {
  const [ordersData, setOrdersData] = useState({})
  useEffect(() => {
    //get user data by id here
  }, [])
  return (
    <>
      <CRow>
        <CCol lg="12">
          <Card>
            <Table
              header="Basket"
              data={tableData}
              fields={tablesFields.basket}
              className="noBorder"
            />
          </Card>
        </CCol>
      </CRow>

      <Card headerActions={actions} header="Information">
        <CRow>
          <InfoField item={{ title: 'Id', value: '1234' }} />
          <InfoField
            item={{
              title: 'Created At',
              value: '12/2/2022',
            }}
          />
          <InfoField item={{ title: 'Status', value: 'Delivered' }} />
        </CRow>
      </Card>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Delivery Information</CCardHeader>
            <CCardBody>
              <CRow>
                <InfoField item={{ title: 'Driver Id', value: '1234' }} />
                <InfoField item={{ title: 'Driver Name', value: 'John' }} />
                <InfoField
                  item={{
                    title: 'Delivered At',
                    value: '12/2/2022',
                  }}
                />
                <InfoField item={{ title: 'Signature', value: 'signature' }}>
                  <Image url="" alt="signature" />
                </InfoField>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SingleOrder
