import React from 'react'
import {Header} from './header/header.jsx'
import Send from '../utils/model.js'
import Login from './login/login.jsx'
import UserInfo from './login/userinfo.jsx'
import { connect } from 'react-redux'
import { log_state } from  '../actions/login.js'


class User extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		const {dispatch} = this.props
		dispatch(log_state())
		console.log(this.props.loginstate)
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.loginstate)
	}
	render(){
		return(
			<div>
				<Header title={'我的'} pagename={'user'} {...this.props}/>
				{this.props.loginstate !== 1 && <Login />}	
				{this.props.loginstate === 1 && <UserInfo />}
			</div>
		)
	}
}

function mapStateToProps(userinfo){
	let {login} = userinfo
	return login
}

export default connect(mapStateToProps)(User)
