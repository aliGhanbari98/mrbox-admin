// modules
import { FC, useState } from 'react'
// components
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, TextField, Button, Attributes, Price } from 'src/components'
import tablesFields from 'src/constants/tablesFields'
import { CIcon } from '@coreui/icons-react'
// helpers
import {
  convertArrayToObject,
  convertToAttributes,
} from 'src/helpers/functions'
// style
import styles from './index.module.scss'

interface Item {
  stock_quantity?: number
  attributes?: any
  price?: any
  id: any
}

interface Props {
  items: Array<Item>
  setState: any
  title?: string
  isUpdating?: boolean
}

const ProductDetails: FC<Props> = ({ items = [], setState, title }) => {
  const [editingItemId, setEditingItemId] = useState('')
  const [price, setPrice] = useState({})
  const [quantity, setQuantity] = useState(0)
  const [attributes, setAttributes] = useState([{ key: '', value: '' }])

  const reset = () => {
    setPrice({})
    setQuantity(0)
    setAttributes([])
  }

  const addItem = () => {
    setState((prevState) => [
      ...prevState,
      {
        attributes: convertArrayToObject({
          data: attributes,
          targetKey: 'key',
          targetValue: 'value',
        }),
        stock_quantity: quantity,
        price,
        id: new Date(),
      },
    ])
    reset()
  }

  const updateItem = () => {
    setState((items) =>
      items.map((item, index) =>
        index === editingItemId
          ? {
              ...item,
              attributes: convertArrayToObject({
                data: attributes,
                targetKey: 'key',
                targetValue: 'value',
              }),
              stock_quantity: quantity,
              price,
            }
          : item
      )
    )
    setEditingItemId('')
    reset()
  }
  const deleteItem = (targetId) =>
    setState((items) => items.filter((_, index) => targetId !== index))

  const selectEditingItem = (targetIndex) => {
    const { price, stock_quantity, attributes } = items.find(
      (_, index) => index === targetIndex
    ) || {
      key: '',
      value: '',
    }
    console.log(attributes)
    setEditingItemId(targetIndex)
    setPrice(price)
    setAttributes(convertToAttributes(attributes))
    setQuantity(stock_quantity || 0)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{title || 'Attributes'}</CCardHeader>
          <CCardBody>
            <CRow className="center">
              <CCol lg="12">
                <TextField
                  label="Stock Quantity"
                  value={quantity}
                  onChange={setQuantity}
                />
              </CCol>
              <CCol lg="12">
                <Price data={price} setData={setPrice} />
              </CCol>
              <CCol lg="12">
                <Attributes
                  items={
                    // isUpdating || isLocalUpdating
                    //   ? convertToAttributes(attributes)
                    //   : attributes
                    attributes
                  }
                  isUpdating
                  setState={setAttributes}
                >
                  {editingItemId === '' || editingItemId === undefined ? (
                    <Button
                      fullWidth
                      color="success"
                      text="Add Collection"
                      onClick={addItem}
                    >
                      <CIcon size="sm" name="cibAddthis" />
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      color="primary"
                      text="Edit Collection"
                      onClick={updateItem}
                    >
                      <CIcon size="sm" name="cilPen" />
                    </Button>
                  )}
                </Attributes>
              </CCol>
            </CRow>
            <Table
              header="Added Collections"
              className={`noBorder ${styles.collections}`}
              fields={tablesFields.productDetails}
              pagination={false}
              data={items.map((item, index) => {
                return {
                  ...item,
                  onDelete: () => deleteItem(index),
                  onEdit: () => selectEditingItem(index),
                }
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductDetails
