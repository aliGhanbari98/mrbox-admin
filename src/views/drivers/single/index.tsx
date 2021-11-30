// modules
import { FC, useEffect, useState } from 'react'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import { CRow, CCol } from '@coreui/react'
import { InfoField, Table, Image, Card, Stats, Gallery } from 'src/components'
// styles
import styles from './index.module.scss'

const addressesData = [
  {
    country: 'US',
    city: 'Los angles',
    state: 'California',
    details: 'address details',
    postalCode: '986562712',
    contactNumber: '09039877712',
  },
  {
    country: 'US',
    city: 'Los angles',
    state: 'California',
    details: 'address details',
    postalCode: '986562712',
    contactNumber: '09039877712',
  },
  {
    country: 'US',
    city: 'Los angles',
    state: 'California',
    details: 'address details',
    postalCode: '986562712',
    contactNumber: '09039877712',
  },
]

const statsItems = [
  { title: 'Delivered Orders', value: 500, color: 'success' },
  { title: 'Avg Ratse', value: 5000, color: 'warning' },
]

const actions = [
  { onClick: () => console.log('clicked'), type: 'edit' },
  { onClick: () => console.log('clicked'), type: 'delete' },
]

const images = [
  { src: '', alt: 'license' },
  { src: '', alt: 'license' },
]

const SingleDriver: FC = () => {
  const [customerInfo, setCustomerInfo] = useState({})
  useEffect(() => {
    //get user data by id here
  }, [])
  return (
    <>
      <Stats items={statsItems} />
      <CRow>
        <CCol>
          <Card header="Information" headerActions={actions}>
            <CRow>
              <InfoField item={{ title: 'Status', value: 'pending' }} />
              <InfoField item={{ title: 'Name', value: 'Ali Ghanbari' }} />
              <InfoField
                item={{
                  title: 'Phone Number',
                  value: '0903989764',
                  status: 'pending',
                }}
              />

              <InfoField
                item={{
                  title: 'DOB',
                  value: '19/2/1998',
                }}
              />
              <InfoField
                item={{
                  title: 'Gender',
                  value: 'male',
                }}
              />
              <InfoField
                item={{
                  title: 'Joined Date',
                  value: '5/10/2021',
                }}
              />
              <InfoField
                item={{
                  title: 'Avatar',
                }}
              >
                <Image alt="avatar" url="" />
              </InfoField>
              <InfoField fullWidth item={{ title: 'License' }}>
                <Gallery size="lg" items={images} />
              </InfoField>
            </CRow>
            <CRow>
              <CCol>
                <Table
                  header="Addresses"
                  fields={tablesFields.driverAddresses}
                  data={addressesData}
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
    </>
  )
}

export default SingleDriver
