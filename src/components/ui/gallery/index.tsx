// modules
import { FC, useEffect, useState } from 'react'
// components
import { CRow, CCol } from '@coreui/react'
import { EditablePhoto, Image } from 'src/components'
// helpers
import { pickDataByLanguage } from 'src/helpers/functions'
import { string } from 'prop-types'

interface Item {
  src?: string
  alt?: any
  thumbnail_url?: string
  id?: string | number
  onChange?: any
  isAvatar?: boolean
}

interface Props {
  items?: Array<Item>
  addImage?: any
  deleteImage?: any
  onEdit?: any
  editable?: boolean
  size?: string
  setState?: any
  data?: Array<any>
  isUpdating?: boolean
  isViewing?: boolean
}

const Gallery: FC<Props> = ({
  setState,
  data = [],
  editable = true,
  size,
  isUpdating = false,
  isViewing = false,
}) => {
  const [items, setItems] = useState([
    { src: '', alt: '', thumbnail_url: '', id: '' },
  ])

  const addImagee = (fileId) => {
    setItems((items) => [
      ...items,
      {
        src: '',
        alt: '',
        thumbnail_url: '',
        id: '',
      },
    ])
    setState((prevState) => [...prevState, fileId])
  }

  /*
   * TODO: check delete
   * */
  const deleteImagee = (targetIndex) => {
    setItems((items) =>
      items.filter((item, index) => {
        return targetIndex !== index
      })
    )
    setState((items) =>
      items.filter((item, index) => {
        return targetIndex !== index
      })
    )
  }

  const editImage = (newId, targetIndex) => {
    // setItems((items) =>
    //   items.filter((item, index) => {
    //     return index !== targetIndex
    //   })
    // )
    setState((prevState) =>
      prevState.map((fileId, index) => (index === targetIndex ? newId : fileId))
    )
  }

  useEffect(() => {
    if (!isUpdating && !isViewing) return
    const prevItems = data.map(({ alt, thumbnail_url, id }) => ({
      src: '',
      thumbnail_url,
      alt,
      id,
    }))

    if (isViewing) setItems(prevItems)
    else
      setItems([
        ...prevItems,
        {
          src: '',
          alt: '',
          thumbnail_url: '',
          id: '',
        },
      ])
  }, [data])

  return (
    <CRow>
      {items.map(({ src, thumbnail_url, alt, id }, index) =>
        !editable ? (
          <CCol sm="3" md="3" lg="3">
            <Image size={size} alt={alt} url={thumbnail_url || src} />
          </CCol>
        ) : (
          <CCol sm="3" md="3" lg="3">
            <EditablePhoto
              id={id || index}
              src={src || thumbnail_url}
              onChange={({ id }) => addImagee(id)}
              onDelete={() => deleteImagee(index)}
              onEdit={({ id }) => editImage(id, index)}
            />
          </CCol>
        )
      )}
      {/* <CCol lg="3">
        <EditablePhoto
          {...{
            ...{
              onChange: null,
              onEdit: null,
              src: '',
              onDelete: null,
              isAddTemplate: true,
              id: '',
            },
          }}
        />
      </CCol> */}
    </CRow>
  )
}

export default Gallery
