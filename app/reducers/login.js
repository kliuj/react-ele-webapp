'use strict';
import * as actionTypes from '../const/actionTypes.js'

const initialData = {
	 username:null,  	
	 loginstate:0  // 0未登录  1登录成功  -1 正在登录	
}

export default function(state = initialData,action){
	console.log(action.type)
	switch(action.type){
		case actionTypes.LOG_SUCCESS:
			return {
				loginstate:1,
				username:action.username
			}
			break
		case actionTypes.LOG_ING:
			return{
				loginstate:-1,
				username:'正在登录'
			}	
		case actionTypes.LOG_OUT:
			return initialData
			break
		default :
			return initialData	
	}
}