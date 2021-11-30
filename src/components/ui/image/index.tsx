// modules
import { FC, useState, useEffect } from 'react'
// components
import { CIcon } from '@coreui/icons-react'
// configs
import configs from 'src/configs/global'
// helpers
import { pickDataByLanguage } from 'src/helpers/functions'
// styles
import styles from './index.module.scss'

export interface Props {
  url: string
  alt: string
  size?: string
}

const Image: FC<Props> = ({ size = 'sm', url, alt }) => {
  return (
    <CIcon
      className={styles[size]}
      src={(url && `${configs.BASE_URL}/${url}`) || '/images/blank_image.png'}
      alt={typeof alt === 'string' ? alt : pickDataByLanguage(alt)}
    />
  )
}

export default Image
