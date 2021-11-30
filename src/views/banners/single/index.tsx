// modules
import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
// components
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { InfoField, Stats, Image } from 'src/components'
// queries
import { getSingleBanner } from 'src/queries/banners'
// helpers
import { pickDataByLanguage } from 'src/helpers/functions'
import { useObjectData } from 'src/helpers/hooks'

const statItems = [
  { title: 'Total Clicks', value: 4000 },
  { title: 'Clicks Graph', value: 20, color: 'success' },
]

const SingleBanner: FC = () => {
  const { id } = useParams()

  const { data: bannerData, setState: setBannerData } = useObjectData({
    id: '',
    number_of_clicks: '',
    promotion: '',
    tags: [],
    target_url: '',
    file: {},
  })

  useEffect(() => {
    getSingleBanner(id).then(setBannerData)
  }, [])

  console.log(bannerData)

  return (
    <>
      <Stats items={statItems} />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Information</CCardHeader>
            <CCardBody>
              <CRow>
                <InfoField
                  item={{
                    title: 'Number of Clicks',
                    value: bannerData.number_of_clicks,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Promotion',
                    value: bannerData.promotion
                      ? bannerData.promotion.name
                      : '-',
                  }}
                />
                <InfoField
                  item={{
                    title: 'Target URL',
                    value: bannerData.target_url,
                  }}
                />
                <InfoField
                  item={{
                    title: 'Tags',
                    value: bannerData.tags.join(', '),
                  }}
                />
                <InfoField item={{ title: 'File' }} fullWidth>
                  <Image
                    url={bannerData.file ? bannerData.file.thumbnail_url : ''}
                    alt={
                      bannerData.file
                        ? pickDataByLanguage(bannerData.file.alt)
                        : ''
                    }
                    size="banner"
                  />
                </InfoField>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SingleBanner
