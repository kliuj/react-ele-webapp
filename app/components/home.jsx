import React from 'react'
import { render } from 'react-dom'

const Home = React.createClass({
	render(){
		return(
			<div className="head-box">
				<input placeholder="搜索商家、商品" />
			</div>
		)
	}
})

export default Home