import React from 'react'
import { render } from 'react-dom'

class List extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		// this.props.onScroll();
		// window.addEventListener('scroll',()=>{

		// })
	}
	render(){
		let L = this.props.list
		return(
			<div ref="scrollContent">
			  {
			  	this.props.data.map(function(item,i){
			  		return <L id={item} key={i}/>
			  	})
			  }
			</div>
		)
	}
}

export default List