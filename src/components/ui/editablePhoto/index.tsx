import { useState } from 'react'
// components
import { Button } from 'src/components'
import { CIcon } from '@coreui/icons-react'
import { CCol } from '@coreui/react'
// configs
import configs from 'src/configs/global'
// queries
import { uploadFileReq, deleteFileReq, uploadAvatar } from 'src/queries/files'
// styles
import styles from './index.module.scss'

const EditablePhoto = ({
  src,
  onChange,
  onDelete,
  onEdit,
  disabled = false,
  isAvatar = false,
  isAddTemplate = false,
  uploadingAvatar = false,
  size = '',
  noMargin = false,
  id,
  fullWidth = false,
}) => {
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)
  const [fileId, setFileId] = useState('')

  const hasPhoto = image || src ? true : false
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const query = uploadingAvatar
        ? uploadAvatar({ file, setProgressValue: setProgress })
        : uploadFileReq({ file, setProgressValue: setProgress })

      query.then((data) => {
        const fileChange = hasPhoto ? onEdit : onChange
        setImage(URL.createObjectURL(file))
        if (fileChange instanceof Function) {
          fileChange(data)
          setFileId(data.id)
        }
        setProgress(0)
      })
    }
  }

  const handleDelete = () => {
    console.log(id)
    deleteFileReq(fileId || id).then(() => {
      if (onDelete instanceof Function) onDelete(id)
      setImage('')
    })
  }

  return (
    <div
      className={`${styles.avatar} ${isAvatar && styles.isAvatar} ${
        noMargin && styles.noMargin
      } ${styles[size]}`}
    >
      {progress && progress < 100 ? (
        <span className={styles.progress}>{progress}</span>
      ) : (
        <CIcon
          className={styles.image}
          src={
            image ||
            (src && `${configs.BASE_URL}/${src}`) ||
            '/images/blank_profile.jpg'
          }
          alt="Avatar"
        />
      )}

      <div className={`${styles.actions} ${disabled ? styles.disabled : ''}`}>
        {hasPhoto && (
          <Button
            className={styles.delete}
            onClick={handleDelete}
            color="danger"
          >
            <CIcon name="cilDelete" size="sm" />
          </Button>
        )}

        <label className={`${hasPhoto ? styles.edit : styles.add}`}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <CIcon
            name={hasPhoto && !isAddTemplate ? 'cilPen' : 'cibAddthis'}
            size="sm"
            color="success"
          />
        </label>

        {/* <label className={styles.add}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <CIcon name="cibAddthis" size="sm" color="success" />
        </label>

        {isAvatar && (
          <label className={styles.edit}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <CIcon name="cilPen" size="sm" />
          </label>
        )} */}
      </div>
    </div>
  )
}

export default EditablePhoto
