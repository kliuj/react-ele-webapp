'use strict';
import * as actionTypes from '../const/actionTypes.js'
import {deleteStore,setTimeStore,getTimeStore} from '../utils/baseStore.js'


//注销 同步
export function log_out (){
	//删除登录信息
	deleteStore('userInfo')
	return {
		type:actionTypes.LOG_OUT
	}
	
}

//登入 异步
export function log_in (obj){
	return dispatch=>{
		//pending  正在进行登录的状态
		dispatch({type:actionTypes.LOG_ING})

		//开始发送异步请求登录
		new Promise((resolve,reject)=>{
			console.log("ok")
			setTimeout(()=>{
				setTimeStore('userInfo',{
					username:obj.username
				})
				resolve({
					type:actionTypes.LOG_SUCCESS,
					username:obj.username
				})
			},1000)
		}).then(res=>{
			dispatch(res)
		})
	}
}

//获取登录信息
export function log_state(){
	console.log(actionTypes.LOG_OUT)
	let result = getTimeStore('userInfo')
	if(result.username){
		return {
			type:actionTypes.LOG_SUCCESS,
			username:result.username
		}
	}else{
		return {
			type:actionTypes.LOG_OUT
		}
	}
	
}