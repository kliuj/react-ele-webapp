import React from 'react'
import List from './common/scrollList.jsx'
import Pro from './common/pro.jsx'
import Send from '../utils/model.js'


class Home extends React.Component{
	constructor(){
		super()
		this.state  = {
			productList :[]
		}
	}
	getMore(){
		let self = this
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	componentWillMount() {
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	render(){
		return(
			<div>
				<div className="head-box">
					<input placeholder="搜索商家、商品" />
				</div>
				<div className="content">
					<h3 className="hot-title">推荐商家</h3>
					<List 
						list={Pro}
						data={this.state.productList}
						onScroll = {this.getMore.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default Home