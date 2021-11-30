import {CCard, CCol, CRow} from "@coreui/react";
import {Table} from "../../components";
import tablesFields from "../../constants/tablesFields";
import {useEffect} from "react";
import {comingSoonAlert} from "../../helpers/alerts";

const Reviews = () => {
  useEffect(() => {
    comingSoonAlert()
  }, []);
  return (
    <>
      <CRow>
        <CCol lg="12">
          <CCard>
            <Table
              header="List of Reviews"
              rowActions={[
                {label: 'Approved', onClick: () => console.log('clicked')},
                {label: 'Reject', onClick: () => console.log('clicked')},
                {label: 'Delete', onClick: () => console.log('clicked')},
              ]}
              data={[
                {product: 'Iphone 12', user: 'Test', review: 'Lorem ipsum dolor sit, ...', posted_at: '26/03/2012', status: 'published'},
                {product: 'Iphone 12', user: 'Test', review: 'Lorem ipsum dolor sit, ...', posted_at: '26/03/2012', status: 'published'},
                {product: 'Iphone 12', user: 'Test', review: 'Lorem ipsum dolor sit, ...', posted_at: '26/03/2012', status: 'published'},
              ]}
              viewActionPath="reviews"
              fields={tablesFields.reviews}
              className="noBorder"
              total={10}
              onPageChange={(page) => console.log(page)}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Reviews;
