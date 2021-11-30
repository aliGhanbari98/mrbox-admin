// modules
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
// constants
import options from 'src/constants/options'
// components
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
} from '@coreui/react'
import {
  FormField,
  TextField,
  Addresses,
  MultiSelect,
  Button,
  DateInput,
  EditablePhoto,
  MultiLangInput,
  Gallery,
} from 'src/components'
// queries
import {
  addVendorReq,
  getSingleVendorReq,
  updateSingleVendor,
} from 'src/queries/vendors'
//helpers
import {
  convertToLangOptions,
  convertToCountryOptions,
} from 'src/helpers/functions'
import { successAlert } from 'src/helpers/alerts'

interface Props {
  langs: Array<string>
  countries: any
}

const AddVendor: FC<Props> = ({ langs, countries }) => {
  const { updatingVendorId } = useParams()
  const router = useHistory()

  // userData
  const [addresses, setAddresses] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [nationalCode, setNationalCode] = useState('')
  const [DOB, setDOB] = useState('')
  const [telephone, setTelephone] = useState('')
  const [language, setLanguage] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  // const [permissions, setPermissions] = useState([])

  //vendorData
  const [account_name, setAccountName] = useState('')
  const [account_no, setAccountNo] = useState('')
  const [bank_name, setBankName] = useState('')
  const [bic, setBic] = useState('')
  const [close_time, setCloseTime] = useState('')
  const [company_title, setCompanyTitle] = useState('')
  const [delivery_time, setDeliveryTime] = useState(0)
  const [description, setDescription] = useState({})
  const [establish_date, setEstablishDate] = useState('')
  const [file_ids, setFileIds] = useState([])
  const [iban, setIban] = useState('')
  const [license_expire_datetime, setLicenseExpireDatetme] = useState('')
  const [license_file_id, setLicenseFileId] = useState({ thumbnail_url: '' })
  const [license_issued_datetime, setLicenseIssuedDatetime] = useState('')
  const [license_number, setLicenseNumber] = useState('')
  const [limit_delivery_time, setLimitDeliveryTime] = useState(0)
  const [logo_file_Id, setLogoFileId] = useState({ thumbnail_url: '' })
  // const [min_stock_quantity, setMinStockQuantity] = useState(0)
  const [open_time, setOpenTime] = useState(0)
  const [subtitle, setSubtitle] = useState({})
  const [swift, setSwift] = useState('')
  const [tax_id, setTaxId] = useState('')
  const [title, setTitle] = useState({})
  const [banner, setBanner] = useState({ thumbnail_url: '' })
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [pickup_addresses, setPickupAddresses] = useState([])

  const isUpdating = updatingVendorId !== 'new'

  const getData = () => {
    getSingleVendorReq(updatingVendorId).then(({ user, vendor }) => {
      console.log({ user, vendor })
      setAddresses(user.addresses)
      setFirstName(user.first_name)
      setLastName(user.last_name)
      // setAvatar()
      setEmail(user.email)
      setPhoneNumber(user.mobile_number)
      setPassword(password)
      setNationalCode(user.national_code)
      setAddresses(user.addresses)
      setDOB(user.date_of_birth)
      setGender(user.gender)
      setLanguage(user.settings.language)
      setCountry(user.settings.country)
      setTelephone(user.telephone)
      setAccountName(vendor.account_name)
      setAccountNo(vendor.account_no)
      setBankName(vendor.bank_name)
      setBic(vendor.bic)
      setCloseTime(vendor.close_time)
      setCompanyTitle(vendor.company_title)
      setDeliveryTime(vendor.delivery_time)
      setDescription(vendor.description)
      setEstablishDate(vendor.establish_date)
      setFileIds(vendor.files)
      setIban(vendor.iban)
      setLicenseExpireDatetme(vendor.license_expire_datetime)
      setLicenseFileId(vendor.license_file)
      setLicenseIssuedDatetime(vendor.license_issued_datetime)
      setLicenseNumber(vendor.license_number)
      setLimitDeliveryTime(vendor.limit_delivery_time)
      setLogoFileId(vendor.logo_file)
      setOpenTime(vendor.open_time)
      setSubtitle(vendor.subtitle)
      setSwift(vendor.swift)
      setTaxId(vendor.tax_id)
      setTitle(vendor.title)
      setType(vendor.type)
      setBanner(vendor.banner)
      setPickupAddresses(vendor.pickup_addresses)
    })
  }

  console.log({ license_file_id, logo_file_Id, file_ids, banner })

  const submit = () => {
    const payload = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        mobile_number: phoneNumber,
        is_enbale: true,
        password,
        national_code: nationalCode,
        addresses,
        avatar,
        date_of_birth: DOB,
        gender,
        geroups: [],
        is_blocked: false,
        is_force_change_login: false,
        is_force_login: false,
        // permissions,
        settings: {
          language,
          country_code: country,
        },
        telephone,
        wallet_amount: 0,
        user_status: 'pending',
        rewards: 0,
      },
      vendor: {
        account_name,
        account_no,
        bank_name,
        bic,
        close_time,
        company_title,
        delivery_time,
        description,
        establish_date,
        file_ids,
        iban,
        license_expire_datetime,
        license_file_id,
        license_issued_datetime,
        license_number,
        limit_delivery_time,
        logo_file_Id,
        // min_stock_quantity,
        open_time,
        subtitle,
        swift,
        tax_id,
        title,
        type,
        banner,
        status: 'suspend',
        pickup_addresses,
      },
    }

    const query = isUpdating
      ? updateSingleVendor({ body: payload, id: updatingVendorId })
      : addVendorReq(payload)

    query.then(() => {
      successAlert(() => router.push('/vendors'))
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <CRow className="center">
      <CCol lg="9">
        <CCard>
          <CCardHeader>User Information</CCardHeader>
          <CCardBody>
            <CForm>
              <FormField label="Avatar" isRow>
                <EditablePhoto
                  noMargin
                  src={avatar}
                  id="1"
                  onChange={({ id }) => {
                    setAvatar(id)
                  }}
                  onDelete={() => console.log}
                  onEdit={({ id }) => setAvatar(id)}
                />
              </FormField>
              <TextField
                label="First Name"
                value={firstName}
                onChange={setFirstName}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={setLastName}
              />
              <TextField label="Email" value={email} onChange={setEmail} />
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <TextField
                label="Password"
                value={password}
                onChange={setPassword}
              />
              <TextField
                label="National Code"
                value={nationalCode}
                onChange={setNationalCode}
              />
              <DateInput
                label="Date of Birth"
                value={DOB}
                convertToISO={false}
                onChange={setDOB}
              />
              <TextField
                label="Telephone"
                value={telephone}
                onChange={setTelephone}
              />
              <MultiSelect
                label="Country"
                name="country"
                value={{ label: country, value: country }}
                options={convertToCountryOptions(countries || [])}
                onChange={({ value }) => setCountry(value)}
                isMulti={false}
              />
              <MultiSelect
                label="Language"
                name="language"
                value={{ label: language, value: language }}
                options={convertToLangOptions(langs || [])}
                onChange={({ value }) => setLanguage(value)}
                isMulti={false}
              />
              <MultiSelect
                label="Gender"
                name="gender"
                value={{ label: gender, value: gender }}
                options={options.gender}
                onChange={({ value }) => setGender(value)}
                isMulti={false}
              />
              <Addresses items={addresses} setData={setAddresses} />
              <Addresses
                title="Pickup Addresses"
                items={pickup_addresses}
                setData={setPickupAddresses}
              />
              {/* <Permissions items={permissions} setState={setPermissions} /> */}
            </CForm>
          </CCardBody>
          {/* <CCardFooter>
            <Button text="Submit" onClick={submit} />
          </CCardFooter> */}
        </CCard>
      </CCol>

      <CCol lg="9">
        <CCard>
          <CCardHeader>Vendor Information</CCardHeader>
          <CCardBody>
            <CForm>
              <FormField label="Logo" isRow>
                <EditablePhoto
                  noMargin
                  src={logo_file_Id && logo_file_Id.thumbnail_url}
                  id="1"
                  onChange={({ id }) => {
                    setLogoFileId(id)
                  }}
                  onDelete={() => console.log}
                  onEdit={({ id }) => setAvatar(id)}
                />
              </FormField>
              <TextField
                label="Account Name"
                value={account_name}
                onChange={setAccountName}
              />
              <TextField
                label="Account Number"
                value={account_no}
                onChange={setAccountNo}
              />
              <TextField
                label="Company Title"
                value={company_title}
                onChange={setCompanyTitle}
              />
              <TextField
                label="Delivery Time"
                value={delivery_time}
                onChange={setDeliveryTime}
              />
              <TextField
                label="Bank Name"
                value={bank_name}
                onChange={setBankName}
              />
              <TextField label="Bic" value={bic} onChange={setBic} />
              <TextField
                label="Close Time"
                value={close_time}
                onChange={setCloseTime}
              />
              <MultiLangInput
                data={description}
                setData={setDescription}
                title="Description"
              />
              <TextField label="Iban" value={iban} onChange={setIban} />
              <DateInput
                label="Establish Date"
                value={establish_date}
                onChange={setEstablishDate}
                convertToISO={false}
              />
              <DateInput
                label="License Expire Date"
                value={license_expire_datetime}
                onChange={setLicenseExpireDatetme}
              />
              <DateInput
                label="License Issued Date"
                value={license_issued_datetime}
                onChange={setLicenseIssuedDatetime}
              />
              <TextField
                label="License Number"
                value={license_number}
                onChange={setLicenseNumber}
              />
              <FormField label="License File" isRow>
                <EditablePhoto
                  noMargin
                  src={license_file_id && license_file_id.thumbnail_url}
                  id="1"
                  onChange={({ id }) => {
                    setLicenseFileId(id)
                  }}
                  onDelete={() => console.log}
                  onEdit={({ id }) => setLicenseFileId(id)}
                />
              </FormField>
              <TextField
                label="Limit Delivery Time"
                value={limit_delivery_time}
                onChange={setLimitDeliveryTime}
              />
              {/* <TextField
                label="Min Stock Quantity"
                value={min_stock_quantity}
                onChange={setMinStockQuantity}
              /> */}
              <TextField
                label="Open time"
                value={open_time}
                onChange={setOpenTime}
              />
              <MultiLangInput data={title} setData={setTitle} title="Title" />
              <MultiLangInput
                data={subtitle}
                setData={setSubtitle}
                title="Subtitle"
              />
              <TextField label="Swift" value={swift} onChange={setSwift} />
              <TextField label="Tax Id" value={tax_id} onChange={setTaxId} />
              <FormField label="Banner" isRow>
                <EditablePhoto
                  noMargin
                  src={banner && banner.thumbnail_url}
                  id="1"
                  onChange={({ id }) => {
                    setBanner(id)
                  }}
                  onDelete={() => console.log}
                  onEdit={({ id }) => setBanner(id)}
                />
              </FormField>
              <MultiSelect
                label="Type"
                name="type"
                value={{ label: type, value: type }}
                options={options.addVendorType}
                onChange={({ value }) => setType(value)}
                isMulti={false}
              />

              <FormField label="Files" isRow={false}>
                <Gallery data={file_ids} setState={setFileIds} isUpdating />
              </FormField>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <Button text="Submit" onClick={submit} />
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = ({ main }) => ({
  countries: main.countries,
  langs: main.langs,
})

export default connect(mapStateToProps, null)(AddVendor)
