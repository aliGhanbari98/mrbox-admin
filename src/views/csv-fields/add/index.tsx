import {FC, useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
  CSelect,
  CFormGroup,
  CLabel
} from '@coreui/react'
import { Button } from 'src/components'
import {getCategoriesReq} from "../../../queries/categories";
import MultipleItemWithDefaultValue from "../../../components/form/multipleItemWithDefaultValue";
import {addCsvFieldsReq, getCsvFieldsReq, updateCsvFieldsReq} from "../../../queries/csv-fields";


const PredefinedItems = [
  {"name":"SKU","predefined":true,"default_value":[]},
  {"name":"Name - English","predefined":true,"default_value":[]},
  {"name":"Name - Arabic","predefined":true,"default_value":[]},
  {"name":"Short description - English","predefined":true,"default_value":[]},
  {"name":"Short description - Arabic","predefined":true,"default_value":[]},
  {"name":"Description - English","predefined":true,"default_value":[]},
  {"name":"Description - Arabic","predefined":true,"default_value":[]},
  {"name":"Unit","predefined":true,"default_value":["piece","number","gram","kilogram","meter","centimeter","liter","milliliter","copy"]},
  {"name":"Stock","predefined":true,"default_value":[]},
  {"name":"Price","predefined":true,"default_value":[]},
  {"name":"Images","predefined":true,"default_value":[]},
  {"name":"Width","predefined":true,"default_value":[]},
  {"name":"Height","predefined":true,"default_value":[]},
  {"name":"Length","predefined":true,"default_value":[]},
  {"name":"Weight","predefined":true,"default_value":[]}
];
const PredefinedItemNames = PredefinedItems.map(item => item.name);

const AddCSV: FC = () => {
  const itemsRef = useRef();
  const { csv_id } = useParams()
  const isUpdating = csv_id !== 'new'
  const router = useHistory()
  const [selected_category, setSelectedCategory] = useState(isUpdating ? csv_id : '');
  const [categories, setCategories] = useState([]);
  const [updatingItems, setUpdatingItems] = useState([]);




  // http://dev.calistu.com:8041/api/v1/admin/product_fields/?category_ids=7d8aedde-469f-48b2-a536-a9fa656b2bda

  const getCategories = () => {
    getCategoriesReq({limit: 500}).then(response => {
      setCategories(response.result.map(item => ({value: item.id, title: item.title, is_parent: !item.parent})).sort((a, b) => a.is_parent < b.is_parent));
    }).catch(error => {
      console.log(error);
      // TODO: handle 409 duplicated
    })
  }

  const getData = () => {
    getCsvFieldsReq({category_ids: csv_id, limit: 500}).then(response => {
      setUpdatingItems(response.result.map(item => ({
        name: item['field_name'],
        predefined: PredefinedItemNames.indexOf(item['field_name']) !== -1,
        default_value: item['valid_values'],
        is_mandatory: item['is_mandatory']
      })));
    })
  }

  const submit = () => {
    const query = isUpdating ? updateCsvFieldsReq : addCsvFieldsReq;
    const items_payload = (itemsRef.current || []).map(item => {
      return {
        field_name: item['name'],
        valid_values: item['default_value'],
        is_mandatory: item['predefined'] ? true : !!item['is_mandatory'],
        is_enable: true
      }
    })
    const PAYLOAD = {
      category_ids: [selected_category],
      all_fields: items_payload
    }
    query(PAYLOAD).then(() => {
      router.push('/csv-fields');
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
    getCategories();

  }, [])

  return (
    <CRow className="center">
      <CCol lg="10">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <CFormGroup>
                <CLabel>
                  Category
                </CLabel>
                <CSelect disabled={isUpdating} value={selected_category} onChange={e => setSelectedCategory(e.target['value'])}>
                  <option value='' selected disabled>Please select a category</option>
                  {
                    categories.map((item, index) => <option key={index} value={item['value']}>{item['title']}</option>)
                  }
                </CSelect>
              </CFormGroup>
            </CForm>


            {
              isUpdating ?
                updatingItems.length ?
                  (
                    <MultipleItemWithDefaultValue
                      title='Items'
                      data={updatingItems}
                      onChange={(data) => itemsRef.current = data}
                    />
                  )
                  :
                  (
                    <>Loading</>
                  )
                :
                (
                  <MultipleItemWithDefaultValue
                    title='Items'
                    data={PredefinedItems}
                    onChange={(data) => itemsRef.current = data}
                  />
                )
            }

          </CCardBody>
          <CCardFooter>
            <Button text="Submit" onClick={submit} />
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddCSV
