// modules
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
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
  Permissions,
} from 'src/components'
// queries
import {
  addCustomerReq,
  updateSingleCustomer,
  getSingleCustomerReq,
} from 'src/queries/customers'
// helpers
import { successAlert } from 'src/helpers/alerts'
import {
  convertToLangOptions,
  convertToCountryOptions,
} from 'src/helpers/functions'

interface Props {
  langs: Array<string>
  countries: any
}

const AddCustomer: FC<Props> = ({ langs, countries }) => {
  const { updatingCustomerId } = useParams()

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
  const [permissions, setPermissions] = useState([])

  const isUpdating = updatingCustomerId !== 'new'

  const getData = () => {
    getSingleCustomerReq(updatingCustomerId).then(
      ({
        first_name,
        last_name,
        email,
        mobile_number,
        is_enbale,
        password,
        national_code,
        addresses,
        avatar,
        date_of_birth,
        gender,
        groups,
        is_blocked,
        is_force_change_login,
        is_force_login,
        permissions,
        settings,
        telephone,
        wallet_amount,
        user_status,
        rewards,
      }) => {
        setFirstName(first_name)
        setLastName(last_name)
        setEmail(email)
        setPhoneNumber(mobile_number)
        setPassword(password)
        setNationalCode(national_code)
        setAddresses(addresses)
        setAvatar(avatar)
        setDOB(date_of_birth)
        setGender(gender)
        setPermissions(permissions)
        setCountry(settings.country_code)
        setLanguage(settings.language)
        setTelephone(telephone)
      }
    )
  }

  const submit = () => {
    const payload = {
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
      groups: [],
      is_blocked: false,
      is_force_change_login: false,
      is_force_login: false,
      permissions,
      settings: {
        language,
        country_code: country,
      },
      telephone,
      wallet_amount: 0,
      user_status: 'pending',
      rewards: 0,
    }

    const query = isUpdating
      ? updateSingleCustomer({ body: payload, id: updatingCustomerId })
      : addCustomerReq(payload)

    query.then(() => {
      successAlert(getData)
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <CRow className="center">
      <CCol lg="9">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <FormField label="Avatar" isRow>
                <EditablePhoto
                  noMargin
                  src={avatar}
                  size="sm"
                  id="1"
                  onChange={({ id }) => setAvatar(id)}
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
                convertToISO={false}
                label="Date of Birth"
                value={DOB}
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
                value={[{ label: country, value: country }]}
                options={convertToCountryOptions(countries || [])}
                onChange={({ value }) => setCountry(value)}
                isMulti={false}
              />
              <MultiSelect
                label="Language"
                name="gender"
                value={[{ label: language, value: language }]}
                options={convertToLangOptions(langs || [])}
                onChange={({ value }) => setLanguage(value)}
                isMulti={false}
              />
              <MultiSelect
                label="Gender"
                name="gender"
                options={options.gender}
                value={[{ label: gender, value: gender }]}
                onChange={({ value }) => setGender(value)}
                isMulti={false}
              />
              <Addresses items={addresses} setData={setAddresses} />
              <Permissions items={permissions} setState={setPermissions} />
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

const mapStateToProps = ({ main }, props) => ({
  countries: main.countries,
  langs: main.langs,
})

export default connect(mapStateToProps, null)(AddCustomer)
