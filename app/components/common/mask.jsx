import React from 'react'

export default class Mask extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      height:0
    }
  }
  componentDidMount(){
    this.setState({
      height:document.body.clientHeight
    })
  }
  render(){
    return (
        <div className="mask" style={{height:this.state.height+'px'}}>
          {<this.props.content  {...this.props}/>}
        </div>
    )
  }
}
