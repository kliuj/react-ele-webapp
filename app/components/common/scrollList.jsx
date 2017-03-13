import React from 'react'
import { render } from 'react-dom'

const height = window.screen.height;
let timeOut = null

class List extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		// 
		
		window.addEventListener('scroll',()=>{
			timeOut && window.clearTimeout(timeOut)	
			timeOut = setTimeout(()=>{
				this.loadMore()
			}, 200);
		})

	}
	loadMore(){
		let y = window.scrollY,
				h = document.getElementById("scrollContent").offsetHeight;
			if(height + y > h){
				this.props.onScroll();
			}	
	}
	render(){
		let L = this.props.list
		return(
			<div ref="scrollContent" id="scrollContent">
			  {
			  	this.props.data.map((item,i)=>{
			  		return <L data={item} key={i}/>
			  	})
			  }
			</div>
		)
	}
}

export default List