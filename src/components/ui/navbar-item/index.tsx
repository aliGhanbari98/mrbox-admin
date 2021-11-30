import React, {FC} from "react";
import {CLink} from "@coreui/react";
import {useLocation} from 'react-router-dom';

interface Props{
  _tag?: string
  name: string
  to: string
  icon: string
}

const NavbarItem:FC<Props> = ({name, to, icon}) => {
  const {pathname} = useLocation();
  return (
    <CLink
      className={`c-sidebar-nav-link ${pathname === to ? 'c-active' : ''}`}
      to={to}
      exact
      activeclassName="c-active"
    >
      <span className={`c-sidebar-nav-icon fa fa-${icon}`}/>
      {name}
    </CLink>
  )
}

export default NavbarItem;
