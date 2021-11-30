// modules
import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
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
import { TextArea, TextField, Button, CreatableSelect } from 'src/components'
// queries
import {
  addNewEntitiy,
  updateSingleEntity,
  getSingleEntity,
} from 'src/queries/entities'
// helpers
import { successAlert } from 'src/helpers/alerts'

const AddEntity: FC = () => {
  const { updatingEntityId } = useParams()

  const [description, setDescription] = useState('')
  const [codeName, setCodeName] = useState('')
  const [rules, setRules] = useState([])

  const isUpdating = updatingEntityId !== 'new'

  const getData = () => {
    getSingleEntity(updatingEntityId).then(
      ({ description, rules, code_name }) => {
        setDescription(description)
        setRules(rules.map((rule) => ({ label: rule, value: rule })))
        setCodeName(code_name)
      }
    )
  }

  const submit = () => {
    const payload = {
      description,
      code_name: codeName,
      rules: rules.map(({ value }) => value),
    }

    const query = isUpdating
      ? updateSingleEntity({ body: payload, id: updatingEntityId })
      : addNewEntitiy(payload)

    query.then(() => {
      successAlert(null)
    })
  }

  console.log(rules)

  useEffect(() => {
    if (isUpdating) getData()
  }, [])

  return (
    <CRow className="center">
      <CCol lg="6">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <TextField
                label="Code Name"
                value={codeName}
                onChange={setCodeName}
              />
              <TextArea
                label="Description"
                value={description}
                onChange={setDescription}
              />
              <CreatableSelect
                onChange={setRules}
                returnWholeItem
                label="Rules"
                value={rules}
                placeholder="Enter the rule"
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

export default AddEntity
