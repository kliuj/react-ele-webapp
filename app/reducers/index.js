'use strict'

//统一管理所有的reducers，方便后期扩展维护

import { combineReducers } from 'redux'

import login from './login.js'


const rootReducer = combineReducers({
 	login
})

export default rootReducer