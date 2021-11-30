// modules
import { FC } from 'react'
// components
import { Button } from 'src/components'
import { CIcon } from '@coreui/icons-react'
import { CLink, CRow, CCol } from '@coreui/react'
// style
import styles from './index.module.scss'

const buttons = {
  export: {
    Icon: <i className="fa fa-download" />,
    text: 'Export',
    color: 'primary',
  },
  import: {
    Icon: <i className="fa fa-upload" />,
    text: 'Import',
    color: 'warning',
  },
  add: {
    Icon: <i className="fa fa-plus" />,
    text: 'Add',
    color: 'success',
  },
  delete: {
    Icon: <CIcon name="cilDelete" />,
    text: 'Delete',
    color: 'danger',
  },
  filter: {
    Icon: <i className="fa fa-filter" />,
    text: 'Filter',
    color: 'secondary',
  },
  approve: {
    Icon: <CIcon name="cilLockLocked" />,
    text: 'Approve',
    color: 'success',
  },
  unapprove: {
    Icon: <CIcon name="cilDelete" />,
    text: 'Unapprove',
    color: 'warning',
  },
  active: {
    Icon: <CIcon name="cilCheck" />,
    text: 'Activate',
    color: 'success',
  },
  deactive: {
    Icon: <CIcon name="cil-cloud-download" />,
    text: 'Deactive',
    color: 'secondary',
  },
  changeStatus: {
    Icon: <i className="fa fa-thumbs-up" />,
    text: 'Change Status',
    color: 'secondary',
  },
  block: {
    Icon: <CIcon name="cil-cloud-download" />,
    text: 'Block/Unblock',
    color: 'primary',
  },
  enable: {
    Icon: <CIcon name="cilCheck" />,
    text: 'Enable',
    color: 'primary',
  },
  disable: {
    Icon: <CIcon name="cilDelete" />,
    text: 'Disable',
    color: 'danger',
  },
  edit: {
    Icon: <CIcon name="cilPen" />,
    text: 'Edit',
    color: 'primary',
  },
  cancel: {
    Icon: <CIcon name="cilDelete" />,
    text: 'Cancel',
    color: 'danger',
  },
  view: {
    Icon: <CIcon name="cilPen" />,
    text: 'View',
    color: 'primary',
  },
  selectAll: {
    Icon: <i className="fa fa-check-square" />,
    text: 'Select All',
    color: 'primary',
  },
  unselectAll: {
    Icon: <i className="fa fa-square" />,
    text: 'Unselect All',
    color: 'warning',
  },
}

interface Item {
  onClick: any
  type: string
  path?: string
  disabled?: boolean
}

interface Props {
  items: Array<Item>
}

const Actions: FC<Props> = ({ items }) => {
  return (
    <div className={styles.sectionActions}>
      {items.map(({ type, path, onClick, disabled }, index) => {
        const { Icon, text, color } = buttons[type]
        if (type === 'add')
          return (
            <CLink
              href={path}
              rel="noreferrer noopener"
              className="card-header-action"
              key={index}
            >
              <Button
                size="sm"
                disabled={disabled}
                onClick={onClick}
                text={text}
                color={color}
              >
                {Icon}
              </Button>
            </CLink>
          )
        else if (type === 'edit') return
        else
          return (
            <Button
              key={index}
              size="sm"
              onClick={onClick}
              text={text}
              color={color}
              disabled={disabled}
            >
              {Icon}
            </Button>
          )
      })}
    </div>
  )
}

export default Actions
