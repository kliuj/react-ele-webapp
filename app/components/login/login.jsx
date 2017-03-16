import React from 'react'
import Send from '../../utils/model.js'

export default class Login extends React.Component{
	render(){
		return(
			<div className="input-box">
        <input placeholder="用户名：1234" />
        <input placeholder="密码：1234" />
        <button className="login-btn">登录</button>
			</div>
		)
	}
}
