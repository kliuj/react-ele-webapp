import React from 'react'
import List from './common/scrollList.jsx'
import Pro from './common/pro.jsx'
import Send from '../utils/model.js'
import {Header} from './header/header.jsx'

class SearchList extends React.Component{
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
				<Header title='搜索结果'  pagename={'searchlist'} {...this.props}/>
				<div className="content">
					<List
						list={Pro}
						pagename={'searchlist'}
						data={this.state.productList}
						onScroll = {this.getMore.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default SearchList
