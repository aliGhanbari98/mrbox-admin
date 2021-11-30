import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CSelect,
  CInput,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { getVendorsReq } from '../../queries/vendors'
import { uploadProductsCSV, getCSVStatus } from 'src/queries/csv'
import {} from 'src/helpers/alerts'

const DATA = {
  Type1_DefinedAttributes: [
    'SKU',
    'Name - English',
    'Name - Arabic',
    'Short description - English',
    'Short description - Arabic',
    'Description - English',
    'Description - Arabic',
    'Unit',
    'Stock',
    'Price',
    'Categories',
    'Images',
    'Brand',
    'Size',
    'Color',
    'Width',
    'Height',
    'Length',
    'Weight',
  ],
  Type2_UniqueProducts: [
    'SKU',
    'Name - English',
    'Name - Arabic',
    'Short description - English',
    'Short description - Arabic',
    'Description - English',
    'Description - Arabic',
    'Unit',
    'Stock',
    'Price',
    'Categories',
    'Images',
    'Width',
    'Height',
    'Length',
    'Weight',
  ],
  Type3_AttributesColumn: [
    'SKU',
    'Name - English',
    'Name - Arabic',
    'Short description - English',
    'Short description - Arabic',
    'Description - English',
    'Description - Arabic',
    'Categories',
    'Unit',
    'Stock',
    'Price',
    'Width',
    'Height',
    'Length',
    'Weight',
    'Attribute 1 Value',
    'Attribute 2 Name',
    'Attribute 2 Value',
    'Attribute 3 Name',
    'Attribute 3 Value',
    'Attribute 4 Name',
    'Attribute 4 Value',
  ],
  Type4_FullDetails: [
    'SKU',
    'Name - English',
    'Name - Arabic',
    'Short description - English',
    'Short description - Arabic',
    'Description - English',
    'Description - Arabic',
    'Unit',
    'Stock',
    'Price',
    'Width',
    'Height',
    'Length',
    'Weight',
    'Color',
    'Priority',
    'Warranty',
    'Guarantee',
    'is_vat_included',
    'Brand',
  ],
  Type5_Groceries: [
    'SKU',
    'Name - English',
    'Name - Arabic',
    'Short description - English',
    'Short description - Arabic',
    'Unit',
    'Stock',
    'Price',
    'Categories',
    'Images',
  ],
}

const ImportCSV = ({ isOpen, toggle }) => {
  const [type, setType] = useState('Type1_DefinedAttributes')
  const [selectedVendor, setSelectedVendor] = useState('')
  const [file, setFile] = useState({})
  const [vendors, setVendors] = useState([])
  useEffect(() => {
    getVendorsReq({ limit: 500 }).then((response) => {
      // console.log(response)
      setVendors(
        response.result.map((item) => ({
          fullname: item.first_name + ' ' + item.last_name,
          id: item.id,
        }))
      )
    })
  }, [])

  const save = () => {
    const PAYLOAD = {
      type,
      vendor: selectedVendor,
      file,
    }
    console.log(PAYLOAD.file)
    uploadProductsCSV(PAYLOAD).then((response) => {
      console.log(response)
      // getCSVStatus(id).then(console.log)
    })
  }

  const selectFile = (e) => {
    if (e && e.target && e.target.files) {
      setFile(e['target']['files']['0'])
    }
  }

  return (
    <CModal show={isOpen} onClose={toggle} size="lg">
      <CModalHeader>Import CSV</CModalHeader>
      <CModalBody>
        <input
          onChange={selectFile}
          type="file"
          className="mb-2"
          accept=".csv"
        />
        <CSelect
          value={type}
          onChange={(e) => setType(e.target['value'])}
          className="mb-2"
        >
          <option value="Type1_DefinedAttributes">
            Type 1 Defined Attributes
          </option>
          <option value="Type2_UniqueProducts">Type 2 Unique Products</option>
          <option value="Type3_AttributesColumn">
            Type 3 Attributes Column
          </option>
          <option value="Type4_FullDetails">Type 4 Full Details</option>
          <option value="Type5_Groceries">Type 5 Groceries</option>
          <option value="all">All</option>
        </CSelect>
        <CSelect
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target['value'])}
          className="mb-2"
        >
          <option disabled selected value="">
            Please Select a Vendor
          </option>
          {vendors.map((item, index) => (
            <option value={item['id']} key={index}>
              {item['fullname']}
            </option>
          ))}
        </CSelect>
        {
          type !== 'all' && (
            <div className="table-responsive">
              <table className="table table-stripped table-bordered">
                <thead>
                <tr>
                  {
                    DATA[type].map((item) => (<th key={item}>{item}</th>))
                  }
                </tr>
                </thead>
              </table>
            </div>
          )
        }
      </CModalBody>
      <CModalFooter>
        <CButton onClick={save} color="success">
          Save
        </CButton>
        <CButton onClick={toggle} color="secondary">
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ImportCSV
