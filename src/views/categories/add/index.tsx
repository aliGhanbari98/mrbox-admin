// modules
import { FC, useEffect, useState } from 'react'
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
import {
  Button,
  MultiSelect,
  Brands,
  EditablePhoto,
  MultiLangInput,
  FormField,
} from 'src/components'
// helpers
import {
  convertToSelectOption,
  pickDataByLanguage,
} from 'src/helpers/functions'
import { successAlert } from 'src/helpers/alerts'
//queries
import {
  addCategoryReq,
  getCategoriesReq,
  getSingleCategory,
  updateSingleCategory,
} from 'src/queries/categories'
import options from 'src/constants/options'

interface Props {
  langs: Array<string>
}

const AddCategory: FC<Props> = ({ langs }) => {
  const { updatingCategoryId } = useParams()
  const router = useHistory()

  const [categories, setCategories] = useState([{}])
  const [title, setTitle] = useState({})
  const [isParent, setIsParent] = useState(true)
  const [parent, setParent] = useState({ id: '', label: '' })
  const [attributes, setAttributes] = useState([])
  const [tags, setTags] = useState([])
  const [file_id, setFileId] = useState('')
  const [image, setImage] = useState({ thumbnail_url: '' })

  const isUpdating = updatingCategoryId !== 'new'

  const getData = () => {
    getSingleCategory(updatingCategoryId).then(
      ({ tags, attributes, title, parent, image }) => {
        setTags(tags)
        setAttributes(attributes)
        setTitle(title)
        setImage(image)
        setIsParent(!parent)
        if (!parent) return
        setParent({ id: parent.id, label: pickDataByLanguage(parent.title) })
      }
    )
  }

  const submit = () => {
    const payload = {
      tags,
      file_id,
      attributes,
      title,
      parent: parent.id,
    }

    const query = isUpdating
      ? updateSingleCategory({ body: payload, id: updatingCategoryId })
      : addCategoryReq(payload)

    query.then(() => {
      successAlert(() => router.push('/categories'))
    })
  }

  useEffect(() => {
    if (isUpdating) getData()
    getCategoriesReq({ limit: 500 }).then(({ result }) => {
      setCategories(convertToSelectOption(result))
    })
  }, [])

  return (
    <>
      <CRow className="center">
        <CCol lg="9">
          <CCard>
            <CCardHeader>Information</CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
                <MultiLangInput data={title} setData={setTitle} title="Title" />

                <MultiSelect
                  label="Tags"
                  onChange={setTags}
                  value={tags.map((item) => ({ label: item, value: item }))}
                  options={options.categoryTags}
                />

                <MultiSelect
                  label="Is Parent ?"
                  isMulti={false}
                  options={[
                    { label: 'yes', value: true },
                    { label: 'no', value: false },
                  ]}
                  value={{ label: isParent ? 'Yes' : 'No', value: !!isParent }}
                  onChange={({ value }) => setIsParent(value)}
                />
                {!isParent && (
                  <MultiSelect
                    label="Parent"
                    isMulti={false}
                    options={categories}
                    value={parent}
                    onChange={({ id, label }) => setParent({ id, label })}
                    isRow
                  />
                )}
                <FormField isRow label="Photo">
                  <EditablePhoto
                    src={image.thumbnail_url}
                    id="1"
                    onChange={({ id }) => setFileId(id)}
                    onEdit={({ id }) => setFileId(id)}
                    onDelete={() => console.log('hey')}
                    size="sm"
                  />
                </FormField>

                {/*<Brands*/}
                {/*  isTagBased*/}
                {/*  setState={setAttributes}*/}
                {/*  items={attributes}*/}
                {/*/>*/}
              </CForm>
            </CCardBody>
            <CCardFooter>
              <Button text="Submit" onClick={submit} />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddCategory
