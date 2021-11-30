/** @format */

// modules
import { createStore, combineReducers, compose } from 'redux'
// reducers
import reducers from '../reducers/index'

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'CRM' })
		: compose
/* eslint-enable */

const store = createStore(combineReducers(reducers), composeEnhancers())

export default store
export const { dispatch, getState } = store
