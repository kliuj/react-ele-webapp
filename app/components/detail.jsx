import React from 'react'
import {Header} from './header/header.jsx'
import Send from '../utils/model.js'

class Detail extends React.Component{
	constructor(props) {
		super(props)
		this.state ={
			detail:null
		}
	}
	componentWillMount() {
		Send('restaurant',null,(data)=>{
			this.setState({
				detail:data
			})
		})
	}
	render(){
		let detailInfo
		if(this.state.detail){
			let info = this.state.detail
			detailInfo = <div className="content">
							<section className="pro">
									<div className="pro-img" >
										<img src={'https://fuss10.elemecdn.com/'+info.image_path.replace(/(\S\S\S)/,"$1/").replace(/(\S)/,"$1/").replace(/(jpeg|png)/,"$1.$1")} />
									</div>
									<div className="pro-item">
										<div className="pro-title">
											<h3>{info.name}</h3>
										</div>
									</div>
							</section>
							<section >
								<p className="shop">商品</p>
							</section>
						</div>
		}else{
			detailInfo = 'loading'
		}
		return (
			<div>
				<Header title={this.state.detail ? this.state.detail.name : '餐厅详情' }  pagename={'detail'} {...this.props}/>
				{ detailInfo}
			</div>
		)
	}
}
export default Detail
