import React from 'react'
import Send from '../../utils/model.js'
import { connect } from 'react-redux'
import * as actions from '../../const/actionTypes.js'
import {log_in} from '../../actions/login.js'

import Mask from '../common/mask.jsx'
import Loading from '../common/loading.jsx'


class Login extends React.Component{
 	constructor(props){
 		super(props)
 		this.state = {
 			username:null,
 			password:null
 		}
 	}
 	goLogin(){
 		if(!this.state.password || !this.state.username || !this.state.password.replace(/\s/g,'') || !this.state.username.replace(/\s/g,'')){
 			alert("请输入用户名和密码")
 			return
 		}
 		const { dispatch } = this.props
 		dispatch(log_in({
 			username:this.state.username,
 			password:this.state.password
 		}))
 	}
	render(){
		return(
			<div className="input-box">
		        <input placeholder="用户名：随便输入"  type="text" onInput={(e)=>{this.setState({username:e.target.value})}}/>
		        <input placeholder="密码：随便输入" type="password" onInput={(e)=>{this.setState({password:e.target.value})}}/>
		        <button className="login-btn" onClick={this.goLogin.bind(this)}>{this.props.loginstate === 0 ? '登录' :'正在登录'}</button>
            {this.props.loginstate !== 0 &&	<Mask content={Loading}/>}
			</div>
		)
	}
}

function mapStateToProps(userinfo){
	let {login} = userinfo
	return login
}

export default connect(mapStateToProps)(Login)
