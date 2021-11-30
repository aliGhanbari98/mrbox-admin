import React, { Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { getLanguagesReq } from 'src/queries/languages'
import { getCountriesReq } from 'src/queries/countries'
import {
  dispatchSetCountries,
  dispatchSetLangs,
} from 'src/redux/action-creators/general'
// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const [langs, setLangs] = useState([])
  useEffect(() => {
    Promise.all([
      getLanguagesReq({}).then(({ result }) => dispatchSetLangs(result)),
      getCountriesReq({}).then(({ result }) => dispatchSetCountries(result)),
    ])
  }, [])

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...{ ...props, langs }} />
                      </CFade>
                    )}
                  />
                )
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
