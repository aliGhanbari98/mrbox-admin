import { createAction } from 'redux-actions'
import { dispatch } from '../store/index'

const setCountries = createAction('SET_COUNTRIES')
export const dispatchSetCountries = (data) => dispatch(setCountries(data))

const setLangs = createAction('SET_LANGS')
export const dispatchSetLangs = (data) => dispatch(setLangs(data))
