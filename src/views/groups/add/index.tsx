// modules
import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
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
import { TextField, Button, Permissions } from 'src/components'
// queries
import {
  addNewGroup,
  updateSingleGroup,
  getSingleGroup,
} from 'src/queries/groups'
// helpers
import { successAlert } from 'src/helpers/alerts'

const AddGroup: FC = () => {
  const { updatingGroupId } = useParams()
  const router = useHistory()

  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState([])

  const isUpdating = updatingGroupId !== 'new'

  const getData = () => {
    getSingleGroup(updatingGroupId).then(({ name, permissions }) => {
      setName(name)
      setPermissions(permissions)
    })
  }

  const submit = () => {
    const payload = {
      permissions,
      name,
    }

    const query = isUpdating
      ? updateSingleGroup({ body: payload, id: updatingGroupId })
      : addNewGroup(payload)

    query.then(() => {
      successAlert(() => router.push('/groups'))
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <CRow className="center">
      <CCol lg="8">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <TextField label="Name" value={name} onChange={setName} />
              <Permissions
                groupPermissions
                tableFieldsKey="groupPermissions"
                items={permissions}
                setState={setPermissions}
              />
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

export default AddGroup
