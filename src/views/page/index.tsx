import {CCard, CCol, CRow} from "@coreui/react";
import {Table} from "../../components";
import tablesFields from "../../constants/tablesFields";
import {paginationHandler} from "../../helpers/functions";
import {useEffect, useState} from "react";
import {getPagesReq} from "../../queries/pages";

const rowActions = [
  { label: 'Edit', onClick: () => console.log('clicked'), path: '/pages' }
];

const Page = () => {
  const [pagesData, setPagesData] = useState({ result: [], total: 0 })

  const getData = (params = {}) => {
    getPagesReq({params}).then(({ total, result }) => {
      setPagesData({
        total,
        result
      })
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <CRow>
      <CCol lg="12">
        <CCard>
          <Table
            header="List of Pages"
            rowActions={rowActions}
            data={pagesData.result}
            viewActionPath="brands"
            fields={tablesFields.pages}
            className="noBorder"
            total={pagesData.total}
            onPageChange={(page) =>
              paginationHandler({ getData, page, limit: 10 })
            }
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Page;
