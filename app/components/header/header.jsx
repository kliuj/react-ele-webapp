import React from 'react'
import { hashHistory } from 'react-router'

export class Header extends React.Component{
	constructor(props) {
		super(props);
		
	}
	goback(){
		hashHistory.push('/')
	}
	render(){
		return(
			<header>
				<div className="back" onClick={this.goback.bind(this)}></div>
				<p>{this.props.title}</p>
			</header>
		)
	}
}
