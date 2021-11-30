// components
import { CBadge, CButton } from '@coreui/react'
import { Button, Image } from 'src/components'
import moment from 'moment'
// helpers
import { getBadge } from 'src/helpers/getBadge'
import { pickDataByLanguage } from 'src/helpers/functions'
// style
import styles from './index.module.scss'

const scopedSlots = {
  status: (item: any) => {
    return (
      <td>
        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
      </td>
    )
  },
  is_enable: (item: any) => (
    <td>
      <CBadge color={getBadge(item.is_enable ? 'Active' : 'Inactive')}>
        {item.is_enable ? 'Enable' : 'Disable'}
      </CBadge>
    </td>
  ),
  title: (item: any) => (
    <td>
      {typeof item.title === 'string'
        ? item.title
        : pickDataByLanguage(item.title)}
    </td>
  ),
  start_datetime: (item: any) => (
    <td>{item.start_datetime && moment(item.start_datetime).format('LL')}</td>
  ),
  end_datetime: (item: any) => (
    <td>{item.end_datetime && moment(item.end_datetime).format('LL')}</td>
  ),
  used_datetime: (item: any) => (
    <td>{item.used_datetime && moment(item.used_datetime).format('LL')}</td>
  ),
  login_datetime: (item: any) => (
    <td>{item.login_datetime && moment(item.login_datetime).format('LL')}</td>
  ),
  create_datetime: (item: any) => (
    <td>
      {item.create_datetime && moment(item.create_datetime).format('LLL')}
    </td>
  ),
  update_datetime: (item: any) => (
    <td>
      {item.update_datetime && moment(item.update_datetime).format('LLL')}
    </td>
  ),
  values: (item: any) => (
    <td>{item.values.map((value) => value).join(', ')}</td>
  ),
  actions: (item: any) => (
    <td style={{ width: 200 }}>
      {item.rowActions.map(({ path, label, onClick, disabled }, index) => {
        const MAP_COLOR = {
          Edit: 'warning',
          View: 'info',
          Delete: 'danger',
          Cancel: 'dark',
          Approved: 'success',
          Reject: 'warning',
        }
        return (
          <CButton
            size="sm"
            color={MAP_COLOR[label]}
            disabled={disabled}
            key={index}
            href={
              label === 'View' || label === 'Edit'
                ? `${path || item.viewActionPath}/${
                    item.id || item.code_name || item.name
                  }`
                : ''
            }
            className="m-1"
            onClick={() => onClick(item.id || item.code_name || item.name)}
          >
            {label}
          </CButton>
        )
      })}
    </td>
  ),
  tags: (item: any) => (
    <td>
      <CBadge color={getBadge(item.tags)}>{item.tags && item.tags[0]}</CBadge>
    </td>
  ),
  view: (item: any) => (
    <td>
      {/* <Button
        text="View"
        className={styles.viewButton}
        onClick={() => console.log('viewing')}
      /> */}
      <a href={`${item.viewActionPath}/${item.id}`}>View</a>
    </td>
  ),
  delete: (item: any) => (
    <td>
      <Button
        text="Delete"
        color="danger"
        size="sm"
        className={styles.viewButton}
        onClick={() => item.onDelete(item.id)}
      />
    </td>
  ),
  edit: (item: any) => (
    <td>
      <Button
        text="Edit"
        size="sm"
        color="primary"
        className={styles.viewButton}
        onClick={() => item.onEdit(item.id)}
      />
    </td>
  ),
  vendor: (item: any) =>
    item.vendor && (
      <td>
        <a href={`vendor/${item.vendor.id}`}>{item.vendor.title}</a>
      </td>
    ),
  order: (item: any) => (
    <td>
      <a href={`order/${item.orderId}`}>{item.vendor}</a>
    </td>
  ),
  logo: (item: any) => (
    <td>
      <Image url={item.logo} alt="logo" />
    </td>
  ),
  image: (item: any) => (
    <td>
      <Image url={item.image.thumbnail_url} alt={item.image.alt} />
    </td>
  ),
  discount_percentage: (item: any) => <td>{item.discount_percentage || ''}</td>,
  listOfProducts: (item: any) => (
    <td>
      <Button
        text="View"
        size="sm"
        className={styles.viewButton}
        onClick={() => console.log('viewing')}
      />
    </td>
  ),
  select: (item: any) => (
    <td>
      <input
        type="checkbox"
        checked={item.selected}
        onChange={(e) =>
          e.target.checked
            ? item.selectItem(item.id)
            : item.unselectItem(item.id)
        }
      />
    </td>
  ),
  // discounted_price: (item: any) => {
  //   const { discounted_price } = item
  //   return (
  //     <td>
  //       {Object.keys(discounted_price).map((key, index) => (
  //         <div key={index}>{`${key} : ${discounted_price[key]}`}</div>
  //       ))}
  //     </td>
  //   )
  // },
  prices: (item: any) => {
    const { prices } = item
    if (prices) {
      return (
        <td>
          {prices.map((key, index) => (
            <div key={index}>{key}</div>
          ))}
        </td>
      )
    } else {
      return <>-</>
    }
  },
  price: (item: any) => {
    const { price } = item
    return (
      <td>
        {Object.keys(price).map((key, index) => (
          <div key={index}>{`${key} : ${price[key]}`}</div>
        ))}
      </td>
    )
  },
  attributes: (item: any) => {
    const { attributes } = item
    return (
      <td>
        {Object.keys(attributes).map(
          (key, index) =>
            attributes[key] && (
              <div key={index}>{`${key} : ${attributes[key]}`}</div>
            )
        )}
      </td>
    )
  },
  rules: (item: any) => <td>{item.rules.map((value) => value).join(', ')}</td>,
  permissions: (item: any) => (
    <td>
      {item.permissions.map(({ entity, rules }) => (
        <>
          <div>{`Entity : ${entity}`}</div>
          <div>{`Rules : ${rules.map((value) => value).join(', ')}`}</div>
          <br />
        </>
      ))}
    </td>
  ),
  entities: (item: any) => (
    <td>
      {item.entity_ids.map(({ type, id }) => (
        <>
          <a href={`/${item.type}/${id}`}>{id}</a>
          <br />
        </>
      ))}
    </td>
  ),
  name: (item: any) => <td>{`${item.first_name} ${item.last_name}`}</td>,
  parent: (item: any) => <td>{item.parent || '-'}</td>,
}

export default scopedSlots
