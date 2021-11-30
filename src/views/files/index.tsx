import {CCol, CRow, CCard, CBadge, CCardBody, CCardTitle, CCardSubtitle, CButton, CPagination} from "@coreui/react";
import {useEffect, useState} from "react";
import {deleteFileReq, getFilesReq} from "../../queries/files";
import {API_BASE} from "../../configs";
import moment from "moment";
import {paginationHandler} from "../../helpers/functions";

const ItemPerPage = 12;
const Files = () => {
  const [filesData, setFilesData] = useState({ result: [], total: 0 });
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = (params = {page: 0, limit: ItemPerPage}) => {
    getFilesReq({params}).then(({ total, result }) => {
      setFilesData({
        total,
        result
      })
    })
  }

  useEffect(() => {
    getData()
  }, []);

  const deleteFile = (file_id) => {
    setLoading(true);
    deleteFileReq(file_id)
      .then(() => {
        getData({page: activePage, limit: ItemPerPage});
        setLoading(false);
      })
  }

  return (
    <CRow>
      <CCol md="12">
        <CRow>
          {
            filesData.result.map((item, index) => {
              const imageURL = API_BASE + '/' + item['thumbnail_url'];
              const styles = {
                display: 'inline-block',
                width: '100%',
                height: '180px',
                background: `url(${imageURL}) center center no-repeat`,
                backgroundSize: 'contain'
              };
              return (
                <CCol lg="2" md="4" key={index}>
                  <CCard>
                    {/*// @ts-ignore*/}
                    <div className="card-img">
                      <span className="img" style={styles}/>
                    </div>
                    <CCardBody>
                      <CCardTitle>{item['alt']['EN'] || '-'}</CCardTitle>
                      <CCardSubtitle className="py-2 text-center">{moment(item['create_datetime']).format('LL')}</CCardSubtitle>
                      <p>
                        <CBadge color={item['is_used'] ? 'success' : 'warning'}>
                          {item['is_used'] ? 'Used' : 'Unused'}
                        </CBadge>
                      </p>
                      <CButton disabled={loading} color='danger' className="d-block w-100" size='sm' onClick={deleteFile.bind(this, item['id'])}>Delete</CButton>
                    </CCardBody>
                  </CCard>
                </CCol>
              )
            })
          }
        </CRow>
      </CCol>
      <CCol className="center">
        {
          (filesData.total && filesData.result.length) && (
            <CPagination
              pages={Math.ceil((filesData.total || filesData.result.length) / ItemPerPage)}
              activePage={activePage}
              onActivePageChange={(page) => {
                setActivePage(page);
                paginationHandler({getData, page, limit: ItemPerPage});
              }}
            />
          )
        }
      </CCol>
    </CRow>
  )
}

export default Files;
