import React from 'react'
import Send from '../../utils/model.js'
import { connect } from 'react-redux'
import {log_out} from '../../actions/login.js'

class UserInfo extends React.Component{
	goLogout(){
		const {dispatch} = this.props;
		dispatch(log_out())
	}
	render(){
		return(
			<div className="input-box">
        		<p className="username">{this.props.username}</p>
        		<button className="login-btn" onClick={this.goLogout.bind(this)}>注销用户</button>
			</div>
		)
	}
}

function mapStateToProps(userinfo){
	let {login} = userinfo
	return login
}

export default connect(mapStateToProps)(UserInfo)