'use strict';

const initialData = {
	 username:null,  	
	 loginstate:false	
}

function changeLoginState(state = initialData,action){
	swicth(action.type){
		case 'login_in':
			return {
				...state,

			}
			break
		case 'login_out':
			return state
			break
		case 'login_error':
			return state
			break	
		default :
			return state		
	}
}