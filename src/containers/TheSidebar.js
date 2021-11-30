import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarMinimizer,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import NavbarItem from '../components/ui/navbar-item'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none bg-white" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          src="/mrbox.svg"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {navigation.map((item, index) => {
          switch (item._tag) {
            case 'CSidebarNavItem': {
              return (
                <NavbarItem
                  name={item.name}
                  to={item.to}
                  icon={item.icon}
                  key={index}
                />
              )
            }
            case 'CNavTitle': {
              return <li className="c-sidebar-nav-title">{item.anchor}</li>
            }
            default:
              return undefined
          }
        })}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
