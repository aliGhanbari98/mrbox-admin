// reducers

import { combineReducers } from 'redux'
import countries from './countries'
import langs from './langs'

export default {
  view: () => ({}),
  main: combineReducers({
    countries,
    langs,
  }),
}
