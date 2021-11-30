import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {haveTokens} from "../helpers/functions";
import {useHistory} from "react-router-dom";

const TheLayout = () => {
  const router = useHistory();
  if (!haveTokens()) {
    router.push('/login');
    return <p>Unauthorized!</p>
  } else
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
