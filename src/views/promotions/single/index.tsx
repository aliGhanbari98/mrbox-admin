// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
// constants
import tablesFields from 'src/constants/tablesFields'
// components
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { InfoField, Table, Card } from 'src/components'
// queries
import { getSinglePromotion, updatePromotions } from 'src/queries/promotions'
// helpers
import { pickDataByLanguage } from 'src/helpers/functions'
import { useObjectData } from 'src/helpers/hooks'
import { updateStatusAlert } from 'src/helpers/alerts'

const SinglePromotion: FC = () => {
  const { id } = useParams()
  const { data: promotionData, setState: setPromotionData } = useObjectData({
    discount: 0,
    end_datetime: '',
    id: '',
    name: '',
    start_datetime: '',
    status: '',
    target: { type: '', entity_ids: [] },
  })

  const getData = () => {
    getSinglePromotion(id).then((result) => {
      console.log(result)
      setPromotionData(result)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const actions = [
    {
      onClick: () => {
        updateStatusAlert(
          updatePromotions,
          {
            ids: [id],
            body: {
              status: 'active',
            },
          },
          getData
        )
      },
      type: 'active',
    },
    {
      onClick: () => {
        updateStatusAlert(
          updatePromotions,
          {
            ids: [id],
            body: {
              status: 'disabled',
            },
          },
          getData
        )
      },
      type: 'disable',
    },
  ]

  return (
    <>
      <CRow>
        <CCol>
          <Card header="Information" headerActions={actions}>
            <CRow>
              <InfoField item={{ title: 'Name', value: promotionData.name }} />
              <InfoField
                item={{ title: 'Discount', value: promotionData.discount }}
              />

              <InfoField
                item={{
                  title: 'Start Time',
                  value: promotionData.start_datetime,
                  isDate: true,
                }}
              />
              <InfoField
                item={{
                  title: 'End Time',
                  value: promotionData.end_datetime,
                  isDate: true,
                }}
              />
              <InfoField
                item={{ title: 'Status', value: promotionData.status }}
              />
            </CRow>
            <Table
              data={[promotionData.target]}
              header="Target"
              fields={tablesFields.promotionTarget}
              className="noBorder"
              pagination={false}
            />
          </Card>
        </CCol>
      </CRow>
    </>
  )
}

export default SinglePromotion
