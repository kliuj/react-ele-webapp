import React from 'react'

const height = window.screen.height;
let timeOut = null
let self = null

class List extends React.Component {
	constructor(){
		super()
		self = this
	}
	componentDidMount(){
		window.addEventListener('scroll',this.scrollLoad)
	}
	scrollLoad(){
		timeOut && window.clearTimeout(timeOut)	
		timeOut = setTimeout(function(){
			self.loadMore()
		}, 200);
	}
	componentWillUnmount(){
		window.removeEventListener('scroll',this.scrollLoad)
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
			  		return <L data={item} key={i} pagename={this.props.pagename}/>
			  	})
			  }
			</div>
		)
	}
}

export default List