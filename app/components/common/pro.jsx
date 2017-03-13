import React from 'react'
import { render } from 'react-dom'

class Pro extends React.Component {
	constructor(){
		super()
	}
	render(){
		return(
			<li className="pro">
				<div className="pro-img" >
					<img src="https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg?imageMogr/format/webp/" />
				</div>
				<div className="pro-item"></div>
			</li>
		)
	}
}

export default Pro