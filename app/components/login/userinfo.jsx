import React from 'react'
import Send from '../../utils/model.js'
import { connect } from 'react-redux'
import {log_out} from '../../actions/login.js'
import Mask from '../common/mask.jsx'
import Message from '../common/message.jsx'


class UserInfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
				showTips:false
		}
	}
	goLogout(){
		// const {dispatch} = this.props;
		// dispatch(log_out())
		this.setState({
			showTips:true
		})
	}
	okAction(){
		const {dispatch} = this.props;
	  dispatch(log_out())
	}
	cancelAction(){
		this.setState({
			showTips:false
		})
	}
	render(){
		return(
			<div className="input-box">
        		<p className="username">{this.props.username}</p>
        		<button className="login-btn" onClick={this.goLogout.bind(this)}>注销用户</button>
						{this.state.showTips && <Mask content={Message} tips={"确认注销吗？"} okAction={this.okAction.bind(this)} cancelAction={this.cancelAction.bind(this)}/>}
			</div>
		)
	}
}

function mapStateToProps(userinfo){
	let {login} = userinfo
	return login
}

export default connect(mapStateToProps)(UserInfo)
