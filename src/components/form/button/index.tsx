// modules
import { FC } from 'react'
// components
import { CButton } from '@coreui/react'
// style
import styles from './index.module.scss'

export interface Props {
  text?: string
  color?: string
  key?: any
  className?: string
  onClick: any
  rounded?: boolean
  active?: boolean
  size?: string
  fullWidth?: boolean
  disabled?: boolean
}

const Table: FC<Props> = ({
  text,
  color = 'primary',
  fullWidth,
  children,
  disabled,
  ...rest
}) => {
  return (
    <CButton
      disabled={disabled}
      className={`${styles.button} ${fullWidth && styles.fullWidth}`}
      {...{ color, ...rest }}
    >
      {text && children ? (
        <div className={styles.innerContent}>
          <span>{text}</span>
          {children}
        </div>
      ) : (
        text || children
      )}
    </CButton>
  )
}

export default Table
