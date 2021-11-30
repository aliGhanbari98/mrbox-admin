// modules
import { FC, useState } from 'react'
// components
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { Button } from 'src/components'
// helpers
import { useToggle } from 'src/helpers/hooks'

export interface Props {
  type?: string
  title: string
  desc?: string
  onOkClick: any
  okText?: string
}

const Modal: FC<Props> = ({
  type = 'primary',
  title,
  children,
  onOkClick,
  desc,
  okText = 'Confirm',
}) => {
  const { value, toggle } = useToggle(false)
  return (
    <>
      <Button color={type} text={okText} onClick={toggle}></Button>
      <CModal show={value} onClose={toggle}>
        <CModalHeader closeButton>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{desc || children}</CModalBody>
        <CModalFooter>
          <Button color={type} text={okText} onClick={onOkClick}></Button>
          <Button color="secondary" text="Cancel" onClick={toggle}>
            Cancel
          </Button>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Modal
