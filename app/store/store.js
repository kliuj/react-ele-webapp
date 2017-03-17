'use strict'

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index.js'


const middlewares = [thunk]
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default function configureStore(initialState){
	return createStoreWithMiddleware(rootReducer,initialState)
}

