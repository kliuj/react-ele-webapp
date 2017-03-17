import React from 'react'
import { hashHistory } from 'react-router'

class Pro extends React.Component {
	constructor(){
		super()
	}
	handelClick(id){
		hashHistory.push('/detail/'+id+'?qhfrom='+this.props.pagename)
	}
	render(){
		let props = this.props.data;
		return(
			<li className="pro" onClick={this.handelClick.bind(this,props.id)}>
				<div className="pro-img" >
					<img src={'https://fuss10.elemecdn.com/'+props.image_path.replace(/(\S\S\S)/,"$1/").replace(/(\S)/,"$1/").replace(/(jpeg|png)/,"$1.$1")} />
				</div>
				<div className="pro-item">
					<div className="pro-title">
						<h3>{props.name}</h3>
					</div>
					<div className="pro-star">
						<span>月售{props.recent_order_num}单</span>
					</div>
					<div className="pro-price">
						<div>
							<span>¥{props.piecewise_agent_fee && props.piecewise_agent_fee.extra_fee}起送</span>
							<span>
					          {props.piecewise_agent_fee && props.piecewise_agent_fee.rules.length > 1 ? props.piecewise_agent_fee.tips : props.piecewise_agent_fee.description}
					        </span>
					     </div>
					</div>
				</div>
			</li>
		)
	}
}

export default Pro
