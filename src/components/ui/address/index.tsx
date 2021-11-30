// modules
import { FC, useState } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, TextField, Button, MultiSelect, Map } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'
//helpers
import options from 'src/constants/options'
// style
import styles from './index.module.scss'

interface Item {
  first_name: string
  last_name: string
  country_code: string
  phone_number: string
  alternate_phone_number: string
  street
  city
  is_default: boolean
  postal_code: string
  address_line_1: string
  address_line_2: string
  state: string
  location: any
  type: string
}

interface Props {
  items: Array<Item>
  setData: any
  title?: string
}

const Addresses: FC<Props> = ({ items = [], setData, title }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [alternatePhoneNumber, setalternatePhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [isDefault, setisDefault] = useState(false)
  const [postalCode, setPostalCode] = useState('')
  const [location, setLocation] = useState({ lat: 25.2048493, lng: 55.2707828 })
  const [type, setType] = useState('')

  const [editingItemId, setEditingItemId] = useState('')

  const reset = () => {
    setCountry('')
    setCity('')
    setState('')
    setContactNumber('')
    setPostalCode('')
    setLocation({ lat: 25.2048493, lng: 55.2707828 })
    setFirstName('')
    setLastName('')
    setalternatePhoneNumber('')
    setAddressLine2('')
    setAddressLine1('')
    setType('')
    setStreet('')
  }

  const addItem = () => {
    setData((prevState) => [
      ...prevState,
      {
        first_name: firstName,
        last_name: lastName,
        country_code: country,
        phone_number: contactNumber,
        alternate_phone_number: alternatePhoneNumber,
        street,
        city,
        is_default: isDefault,
        postal_code: postalCode,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        state,
        location: {
          coordinates: [location.lat, location.lng],
          type: 'Point',
        },
        type,
      },
    ])
    reset()
  }

  const updateItem = () => {
    setData((items) =>
      items.map((item, index) =>
        index === editingItemId
          ? {
              ...item,
              first_name: firstName,
              last_name: lastName,
              country_code: country,
              phone_number: contactNumber,
              alternate_phone_number: alternatePhoneNumber,
              street,
              city,
              is_default: isDefault,
              postal_code: postalCode,
              address_line_1: addressLine1,
              address_line_2: addressLine2,
              state,
              location: {
                coordinates: [location.lat, location.lng],
                type: 'Point',
              },
              type,
            }
          : item
      )
    )
    setEditingItemId('')
    reset()
  }

  const deleteItem = (targetIndex) =>
    setData((items) => items.filter((item, index) => targetIndex !== index))

  const selectEditingItem = (targetIndex) => {
    const {
      first_name,
      last_name,
      country_code,
      phone_number,
      alternate_phone_number,
      street,
      city,
      is_default,
      postal_code,
      address_line_1,
      address_line_2,
      state,
      location,
      type,
    } = items.find((item, index) => index === targetIndex) || {
      first_name: '',
      last_name: '',
      country_code: '',
      phone_number: '',
      alternate_phone_number: '',
      street: '',
      city: '',
      is_default: false,
      postal_code: '',
      address_line_1: '',
      address_line_2: '',
      state: '',
      location: {},
      type: '',
    }
    setEditingItemId(targetIndex)
    setFirstName(first_name)
    setLastName(last_name)
    setCountry(country_code)
    setContactNumber(phone_number)
    setalternatePhoneNumber(alternate_phone_number)
    setStreet(street)
    setisDefault(is_default)
    setPostalCode(postal_code)
    setAddressLine2(address_line_2)
    setAddressLine1(address_line_1)
    setType(type)
    setCountry(country)
    setCity(city)
    setState(state)
    setisDefault(isDefault)
    setPostalCode(postalCode)
    setLocation({ lat: location.coordinates[0], lng: location.coordinates[1] })
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{title || 'Addresses'}</CCardHeader>
          <CCardBody>
            <CRow className="center">
              <CCol lg="12">
                <Map state={location} setState={setLocation} />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="First Name"
                  isRow={false}
                  value={firstName}
                  onChange={setFirstName}
                />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="Last Name"
                  isRow={false}
                  value={lastName}
                  onChange={setLastName}
                />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="Phone Number"
                  isRow={false}
                  value={contactNumber}
                  onChange={setContactNumber}
                />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="Aternate Phone Number"
                  isRow={false}
                  value={alternatePhoneNumber}
                  onChange={setalternatePhoneNumber}
                />
              </CCol>
              <CCol lg="4">
                <MultiSelect
                  label="Country"
                  isRow={false}
                  isMulti={false}
                  options={options.countries}
                  onChange={({ value }) => setCountry(value)}
                />
              </CCol>
              <CCol lg="4">
                <TextField
                  label="City"
                  isRow={false}
                  value={city}
                  onChange={setCity}
                />
              </CCol>
              <CCol lg="4">
                <TextField
                  label="State"
                  isRow={false}
                  value={state}
                  onChange={setState}
                />
              </CCol>

              <CCol lg="12">
                <TextField
                  label="Address Line 1"
                  isRow={false}
                  value={addressLine1}
                  onChange={setAddressLine1}
                />
              </CCol>
              <CCol lg="12">
                <TextField
                  label="Address Line 2"
                  isRow={false}
                  value={addressLine2}
                  onChange={setAddressLine2}
                />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="Street"
                  isRow={false}
                  value={street}
                  onChange={setStreet}
                />
              </CCol>
              <CCol lg="6">
                <TextField
                  label="Postal Code"
                  isRow={false}
                  value={postalCode}
                  onChange={setPostalCode}
                />
              </CCol>
              <CCol lg="4">
                <MultiSelect
                  label="Type"
                  isRow={false}
                  isMulti={false}
                  value={[{ label: type, value: type }]}
                  options={options.addressType}
                  onChange={({ value }) => setType(value)}
                />
              </CCol>
              <CCol lg="4">
                <MultiSelect
                  label="Is Default"
                  isRow={false}
                  isMulti={false}
                  value={[
                    { label: isDefault ? 'Yes' : 'No', value: isDefault },
                  ]}
                  options={options.boolean}
                  onChange={({ value }) => setisDefault(value)}
                />
              </CCol>
              <CCol lg="4">
                {editingItemId === '' ? (
                  <Button
                    fullWidth
                    color="success"
                    text="Add"
                    onClick={addItem}
                  >
                    <CIcon size="sm" name="cibAddthis" />
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    color="primary"
                    text="Update"
                    onClick={updateItem}
                  >
                    <CIcon size="sm" name="cilPen" />
                  </Button>
                )}
              </CCol>
            </CRow>
            <Table
              header="Added"
              className="noBorder"
              fields={tablesFields.addAddress}
              pagination={false}
              data={items.map((item, index) => ({
                ...item,
                onDelete: () => deleteItem(index),
                onEdit: () => selectEditingItem(index),
              }))}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Addresses
