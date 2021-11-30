// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import { CRow, CCol } from '@coreui/react'
import {
  InfoField,
  Table,
  Gallery,
  Stats,
  MultiSelect,
  Card,
  Image,
} from 'src/components'
import MainChartExample from 'src/views/charts/MainChartExample.js'
// queries
import {
  getSingleProduct,
  getProductsRates,
  getProductsReviews,
  deleteProductReq,
  changeProductsStatus,
} from 'src/queries/products'
// helpers
import { useObjectData } from 'src/helpers/hooks'
import {
  pickDataByLanguage,
  convertToSelectOption,
  convertToAttributes,
} from 'src/helpers/functions'
import { deleteItemAlert, updateStatusAlert } from 'src/helpers/alerts'

const logsData = [
  {
    dateTime: '12/5/2021',
    description: 'This is a test description',
  },
  {
    dateTime: '12/5/2021',
    description: 'This is a test description',
  },
]

const buyintCustomersData = [
  {
    first_name: 'Ali',
    last_name: 'Ghanbari',
    orderId: '123456',
    dateTime: '12/5/2021',
  },
]

const ratesAndReviews = [
  {
    dateTime: '12/5/2021',
    customerName: 'Ali',
    rate: 5,
    review: 'good quality',
  },
]

const statItems = [
  { title: 'Total Sale', value: 200 },
  { title: 'Total Earned', value: 3000, color: 'success' },
  { title: 'Avg Rates', value: 100, color: 'secondary' },
  { title: 'Total Likes', value: 100, color: 'warning' },
]

const images = [{ src: '', id: '-1', onChange: () => console.log('add') }]

const rateAndReviewsRowActions = [
  { label: 'Approve', onClick: () => console.log('clicked') },
  { label: 'Reject', onClick: () => console.log('clicked') },
  { label: 'Delete', onClick: () => console.log('clicked') },
]

interface Props {
  langs: Array<string>
}

const SingleProduct: FC<Props> = ({ langs }) => {
  const { id } = useParams()
  const [imagesState, setImages] = useState(images)
  const [rates, setRates] = useState([{ result: [], total: 0 }])
  const [reviews, setReviews] = useState([{ total: 0, result: [] }])
  const { data: productInfo, setState: setProductInfo } = useObjectData({
    id: '',
    title: {},
    subtitle: '',
    brand: '',
    dimensions: {},
    image: {},
    is_vat_included: '',
    prices: {},
    tags: [],
    weight: '',
    vendor: '',
    description: '',
    categories: [],
    subCategories: [],
    locations: [],
    files: [],
  })

  const getData = () =>
    getSingleProduct(id).then(
      ({ categories, exclude_countries, include_countries, ...rest }) => {
        setProductInfo({
          categories: convertToSelectOption(categories),
          included_countries:
            include_countries && convertToSelectOption(include_countries),
          excluded_countries:
            exclude_countries && convertToSelectOption(exclude_countries),
          ...rest,
        })
      }
    )

  const actions = [
    {
      onClick: () =>
        updateStatusAlert(
          changeProductsStatus,
          {
            products_ids: [id],
            status: 'published',
          },
          getData
        ),
      type: 'approve',
    },
    {
      onClick: () =>
        updateStatusAlert(
          changeProductsStatus,
          {
            products_ids: [id],
            status: 'rejected',
          },
          getData
        ),
      type: 'unapprove',
    },
    {
      onClick: (id) => deleteItemAlert(deleteProductReq, id, getData),
      type: 'delete',
    },
  ]

  useEffect(() => {
    getData()
    Promise.all([
      getProductsRates({}).then(({ result, total }) => {
        // setRates({ total, result })
      }),
      getProductsReviews({}).then(({ total, result }) => {
        // setReviews({ total, result })
      }),
    ])
  }, [])

  return (
    productInfo.vendor && (
      <>
        <CRow>
          <CCol lg="12">
            <Card header="Orders History">
              <CRow>
                <CCol>
                  <Stats items={statItems} />
                </CCol>
              </CRow>
            </Card>
            <Card header="Sales Chart">
              <CRow>
                <CCol>
                  <MainChartExample
                    style={{ height: '300px', marginTop: '40px' }}
                  />
                </CCol>
              </CRow>
            </Card>
          </CCol>
          <CCol lg="8">
            <Card header="Information" headerActions={actions}>
              <CRow>
                <InfoField
                  item={{
                    title: 'Title',
                    value: productInfo.title,
                  }}
                  isRow
                />
                <InfoField
                  item={{
                    title: 'Sub Title',
                    value: productInfo.subtitle,
                  }}
                  isRow
                />

                <InfoField
                  item={{
                    title: 'Brand',
                    value: productInfo.brand.name,
                  }}
                  isRow
                />
                <InfoField
                  fullWidth
                  item={{
                    title: 'Description',
                    value: productInfo.description,
                  }}
                  isRow
                />
              </CRow>
            </Card>
            <Card header="Product Photos">
              <InfoField item={{ title: 'Base File' }} isRow>
                <Image
                  url={productInfo.image.thumbnail_url}
                  alt={
                    productInfo.image.alt &&
                    pickDataByLanguage(productInfo.image.alt)
                  }
                  size="lg"
                />
              </InfoField>
              <InfoField item={{ title: 'Files' }} isRow>
                <Gallery
                  size="lg"
                  data={productInfo.files}
                  setState={setImages}
                  editable={false}
                  onEdit={() => console.log('edit')}
                  isViewing
                />
              </InfoField>
            </Card>
            <Table
              header="Product Attributes"
              className="noBorder"
              pagination={false}
              rowActions={rateAndReviewsRowActions}
              fields={tablesFields.uneditableProductDetails}
              data={productInfo.details}
            />
            <Table
              header="Rates and Reviews"
              className="noBorder"
              pagination={false}
              rowActions={rateAndReviewsRowActions}
              fields={tablesFields.ratesAndReviews}
              data={ratesAndReviews}
            />
          </CCol>
          <CCol lg="4">
            <Card header="Product Information">
              <CRow>
                <InfoField
                  item={{
                    title: 'Product Code',
                    value: productInfo.product_code,
                  }}
                  isRow
                />
                <InfoField
                  item={{
                    title: 'Vendor',
                    value: productInfo.vendor.title,
                  }}
                  isRow
                />
                <InfoField
                  item={{
                    title: 'tags',
                    value: productInfo.tags && productInfo.tags.join(', '),
                  }}
                  isRow
                />
                <InfoField isRow>
                  <MultiSelect
                    label="Category"
                    defaultValue={productInfo.categories[0]}
                    options={productInfo.categories}
                    disabled
                    isMulti={false}
                  />
                </InfoField>

                {productInfo.categories[1] && (
                  <InfoField isRow>
                    <MultiSelect
                      label="Sub Category"
                      defaultValue={productInfo.categories[1]}
                      options={productInfo.categories}
                      disabled
                      isMulti={false}
                    />
                  </InfoField>
                )}
              </CRow>
            </Card>

            <Card header="Product Dimensions">
              <InfoField
                item={{
                  title: 'Length',
                  value: productInfo.dimensions.length,
                }}
                isRow
              />
              <InfoField
                item={{
                  title: 'Width',
                  value: productInfo.dimensions.width,
                }}
                isRow
              />
              <InfoField
                item={{
                  title: 'Height',
                  value: productInfo.dimensions.height,
                }}
                isRow
              />
              <InfoField
                item={{
                  title: 'Weight',
                  value: productInfo.weight,
                }}
                isRow
              />
            </Card>

            <Card header="Product ِDetails">
              <InfoField
                item={{
                  title: 'Is Vat Included',
                  value: productInfo.is_vat_included ? 'Yes' : 'No',
                }}
                isRow
              />
              <InfoField
                item={{
                  title: 'Warranty',
                  value: productInfo.warranty,
                }}
                isRow
              />
              <InfoField
                item={{
                  title: 'Guarantee',
                  value: productInfo.guarantee,
                }}
                isRow
              />
            </Card>

            <Card header="Product Availability">
              <InfoField isRow>
                <MultiSelect
                  label="Included Countries"
                  name="included_countries"
                  defaultValue={productInfo.included_countries}
                  disabled
                />
              </InfoField>

              <InfoField isRow>
                <MultiSelect
                  label="Excluded Countries"
                  name="excluded_countries"
                  defaultValue={productInfo.excluded_countries}
                  disabled
                />
              </InfoField>
            </Card>

            <Table
              header="Logs"
              className="noBorder"
              pagination={false}
              fields={tablesFields.logs}
              data={logsData}
            />
            <Table
              header="customers bought this product"
              className="noBorder"
              pagination={false}
              fields={tablesFields.buyingCustomers}
              data={buyintCustomersData}
            />
          </CCol>
        </CRow>
      </>
    )
  )
}

export default SingleProduct
