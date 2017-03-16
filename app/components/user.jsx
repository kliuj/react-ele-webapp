import React from 'react'
import {Header} from './header/header.jsx'
import Send from '../utils/model.js'
import Login from './login/login.jsx'

const User = React.createClass({
	render(){
		return(
			<div>
				<Header title={'我的'} pagename={'user'} {...this.props}/>
				<Login />	
			</div>
		)
	}
})

export default User
