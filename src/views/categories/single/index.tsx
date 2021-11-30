// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { InfoField, Image, Table } from 'src/components'
// helpers
import { pickDataByLanguage } from 'src/helpers/functions'
import { useObjectData } from 'src/helpers/hooks'
// queries
import { getSingleCategory } from 'src/queries/categories'

const SingleCategory: FC = () => {
  const { id } = useParams()

  const { data: categoryData, setState: setCategoryData } = useObjectData({
    title: {},
    tags: [],
    image: {},
    parent: '',
    order: 0,
    attributes: [],
    is_basket_limited: true,
    is_enable: true,
  })

  useEffect(() => {
    getSingleCategory(id).then((result) => {
      console.log(result)
      setCategoryData(result)
    })
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Information</CCardHeader>
            <CCardBody>
              <CRow>
                <InfoField
                  item={{
                    title: 'Title',
                    value: pickDataByLanguage(categoryData.title),
                  }}
                />
                <InfoField
                  item={{
                    title: 'Tags',
                    value: categoryData.tags.map((item) => item).join(', '),
                  }}
                />
                <InfoField
                  item={{
                    title: 'Parent',
                    value:
                      (categoryData.parent &&
                        pickDataByLanguage(categoryData.parent.title)) ||
                      '-',
                  }}
                />
                <InfoField
                  item={{ title: 'Order', value: categoryData.order }}
                />
                <InfoField
                  item={{
                    title: 'Is Basket Limited',
                    value: categoryData.is_basket_limited ? 'Yes' : 'No',
                  }}
                />
                <InfoField
                  item={{
                    title: 'Is Enable',
                    value: categoryData.is_enable ? 'Yes' : 'No',
                  }}
                />
                <InfoField item={{ title: 'image' }}>
                  <Image
                    url={
                      categoryData.image ? categoryData.image.thumbnail_url : ''
                    }
                    alt={
                      categoryData.image
                        ? pickDataByLanguage(categoryData.image.alt)
                        : ''
                    }
                    size="lg"
                  />
                </InfoField>
                {/* <CCol lg="12">
                  <Table
                    header="Attributes"
                    fields={tablesFields.singleCategoryAttributes}
                    data={categoryData.attributes}
                    pagination={false}
                  />
                </CCol> */}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SingleCategory
