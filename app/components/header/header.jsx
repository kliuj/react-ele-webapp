import React from 'react'
import { hashHistory} from 'react-router'
import {saveFrom,getBack} from '../../utils/baseStore.js'
import {utilBack} from '../../utils/back.js'

export class Header extends React.Component{
	constructor(props) {
		super(props);
		saveFrom(this.props)
	}
	goback(){
		utilBack(this.props)
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
