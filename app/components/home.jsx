import React from 'react'
import { render } from 'react-dom'
import List from './common/scrollList.jsx'
import Pro from './common/pro.jsx'


class Home extends React.Component{
	constructor(){
		super()
		this.state  = {
			productList :[1,2,3,4,5,6,7]
		}
	}
	getMore(){
		let self = this
		// setInterval(function(){
		// 	self.setState({
		// 		productList:self.state.productList.concat([1,2,3,4,5,6,7])
		// 	})
		// },2000)
	}
	render(){
		return(
			<div>
				<div className="head-box">
					<input placeholder="搜索商家、商品" />
				</div>
				<h3 className="hot-title">推荐商家</h3>
				<List 
					list={Pro}
					data={this.state.productList}
					onScroll = {this.getMore.bind(this)}
				/>
			</div>
		)
	}
}

export default Home