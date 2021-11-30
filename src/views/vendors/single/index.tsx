// modules
import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import moment from 'moment'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButtonGroup,
} from '@coreui/react'
import {
  InfoField,
  Table,
  Card,
  Stats,
  Gallery,
  Image,
  Button,
} from 'src/components'
import MainChartExample from 'src/views/charts/MainChartExample.js'
// helpers
import { useObjectData } from 'src/helpers/hooks'
import {
  pickDataByLanguage,
  convertToSelectOption,
  convertToAttributes,
} from 'src/helpers/functions'
// queries
import { getSingleVendorReq } from 'src/queries/vendors'

const productsListData = [
  { id: '1234', thumbnail: 'thumbnail', price: 40000 },
  { id: '1234', thumbnail: 'thumbnail', price: 40000 },
  { id: '1234', thumbnail: 'thumbnail', price: 40000 },
]

const statItems = [
  { title: 'Sales Chart', value: 4000 },
  { title: 'Total Products', value: 200, color: 'success' },
  { title: 'Total Oreders', value: 200, color: 'danger' },
  { title: 'Total Income', value: 3000 },
  { title: 'Commision', value: 3000, color: 'success' },
  { title: 'AVG Rates', value: 3000, color: 'secondary' },
  { title: 'Total Wish listed', value: 100, color: 'warning' },
]

const actions = [{ onClick: () => console.log('clicked'), type: 'approve' }]

const SingleVendor: FC = () => {
  const { id } = useParams()
  const { data: vendorData, setState: setVendorData } = useObjectData({
    user: {
      settings: {},
      avatar: {},
    },
    vendor: {
      account_name: '',
      account_no: '',
      bank_name: '',
      bic: '',
      close_time: '',
      company_title: '',
      delivery_time: '',
      description: {},
      establish_date: '',
      iban: '',
      license_expire_datetime: '',
      license_file: {},
      license_issued_datetime: '',
      license_number: '',
      limit_delivery_time: '',
      logo_file: '',
      open_time: '',
      subtitle: {},
      files: [],
      swift: '',
      tax_id: '',
      title: {},
      type: '',
      banner: '',
      status: 'suspend',
      pickup_addresses: [],
    },
  })

  console.log(vendorData)

  useEffect(() => {
    getSingleVendorReq(id).then((result) => {
      setVendorData(result)
    })
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Statistics</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <Stats items={statItems} />
                  {/* <Table
                    header="Active Categories"
                    className="noBorder"
                    fields={tablesFields.activeCategories}
                    data={vendorData.vendor.categories.map(({ title }) => ({
                      title,
                    }))}
                  /> */}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
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
        <CCol>
          <Card header="Information" headerActions={actions}>
            <CRow>
              <InfoField item={{ title: 'Logo' }}>
                <Image
                  url={
                    vendorData.vendor.logo_file &&
                    vendorData.vendor.logo_file.thumbnail_url
                  }
                  alt="Logo"
                  size="md"
                />
              </InfoField>
              <InfoField
                item={{
                  title: 'Company Title',
                  value: vendorData.vendor.company_title,
                }}
              />
              <InfoField
                item={{
                  title: 'Title',
                  value: pickDataByLanguage(vendorData.vendor.title),
                }}
              />
              <InfoField
                item={{
                  title: 'Subtitle',
                  value: pickDataByLanguage(vendorData.vendor.subtitle),
                }}
              />

              <InfoField
                item={{ title: 'Status', value: vendorData.vendor.status }}
              />
              <InfoField
                item={{
                  title: 'Account Number',
                  value: vendorData.vendor.account_no,
                }}
              />
              <InfoField
                item={{
                  title: 'Account Name',
                  value: vendorData.vendor.account_name,
                }}
              />
              <InfoField
                item={{
                  title: 'Bic',
                  value: vendorData.vendor.bic,
                }}
              />
              <InfoField
                item={{
                  title: 'Iban',
                  value: vendorData.vendor.iban,
                }}
              />

              <InfoField
                item={{
                  title: 'Establish Date',
                  value:
                    vendorData.vendor.establish_date &&
                    moment(vendorData.vendor.establish_date).format('LL'),
                }}
              />

              <InfoField
                item={{
                  title: 'Description',
                  value: pickDataByLanguage(vendorData.vendor.description),
                }}
              />
              <InfoField
                item={{
                  title: 'Open Time',
                  value: vendorData.vendor.open_time,
                }}
              />
              <InfoField
                item={{
                  title: 'Close Time',
                  value: vendorData.vendor.close_time,
                }}
              />
              <InfoField
                item={{
                  title: 'Delivery Time',
                  value: vendorData.vendor.delivery_time,
                }}
              />
              <InfoField
                item={{
                  title: 'Limit Delivery Time',
                  value: vendorData.vendor.limit_delivery_time,
                }}
              />
              <InfoField
                item={{
                  title: 'Type',
                  value: vendorData.vendor.type,
                }}
              />

              <InfoField
                item={{
                  title: 'License Number',
                  value: vendorData.vendor.license_number,
                }}
              />
              <InfoField
                item={{
                  title: 'License Issued',
                  value:
                    vendorData.vendor.license_issued_datetime &&
                    moment(vendorData.vendor.license_issued_datetime).format(
                      'LL'
                    ),
                }}
              />
              <InfoField
                item={{
                  title: 'License Expired',
                  value:
                    vendorData.vendor.license_expire_datetime &&
                    moment(vendorData.vendor.license_expire_datetime).format(
                      'LL'
                    ),
                }}
              />
              <InfoField
                item={{
                  title: 'Swift',
                  value: vendorData.vendor.swift,
                }}
              />
              <InfoField
                item={{
                  title: 'Tax Id',
                  value: vendorData.vendor.tax_id,
                }}
              />
              <InfoField item={{ title: 'License' }}>
                <Image
                  url={vendorData.vendor.license_file.thumbnail_url}
                  alt="License"
                  size="md"
                />
              </InfoField>
              <InfoField item={{ title: 'Banner' }}>
                <Image
                  url={
                    vendorData.vendor.banner &&
                    vendorData.vendor.banner.thumbnail_url
                  }
                  alt="Banner"
                  size="md"
                />
              </InfoField>
              <CRow>
                <CCol>
                  <Table
                    header="Addresses"
                    fields={tablesFields.addressList}
                    data={vendorData.vendor.pickup_addresses}
                    pagination={false}
                  />
                </CCol>
              </CRow>
              {/* <InfoField item={{ title: 'Banners' }} fullWidth>
                <Gallery
                  items={imagesState}
                  editable={false}
                  onEdit={() => console.log('edit')}
                />
              </InfoField> */}
            </CRow>
          </Card>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>User Information</CCardHeader>
            <CCardBody>
              <CRow>
                <InfoField
                  item={{
                    title: 'Status',
                    value: vendorData.user.user_status,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Name',
                    value: `${vendorData.user.first_name} ${vendorData.user.last_name}`,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Phone Number',
                    value: vendorData.user.mobile_number,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Email Address',
                    value: vendorData.user.email,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Telephone',
                    value: vendorData.user.telephone,
                  }}
                />
                <InfoField
                  item={{
                    title: 'DOB',
                    value: vendorData.user.date_of_birth,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Language',
                    value: vendorData.user.settings.language,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Country',
                    value: vendorData.user.settings.country,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Gender',
                    value: vendorData.user.gender,
                  }}
                />
                <InfoField
                  item={{
                    title: 'National Code',
                    value: vendorData.user.national_code,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Wallet Amount',
                    value: vendorData.user.wallet_amount,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Rewards',
                    value: vendorData.user.rewards,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Avatar',
                  }}
                >
                  <Image
                    alt="avatar"
                    url={vendorData.user.avatar.thumbnail_url}
                  />
                </InfoField>

                <CRow>
                  <CCol>
                    <Table
                      header="Addresses"
                      fields={tablesFields.addressList}
                      data={vendorData.user.addresses}
                      pagination={false}
                    />
                  </CCol>
                </CRow>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <Table
            header="Products"
            className="noBorder"
            fields={tablesFields.vendorProducts}
            data={productsListData}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <Card header="Media">
            <Gallery
              data={vendorData.vendor.files}
              isViewing
              editable={false}
            />
          </Card>
        </CCol>
      </CRow>
    </>
  )
}

export default SingleVendor
