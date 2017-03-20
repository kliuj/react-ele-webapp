import React from 'react'
export default class Message extends React.Component {
  render(){
    return(
      <div className="message-box">
        <p>{this.props.tips}</p>
        <div className="ok-btn" onClick={this.props.okAction}>确认</div>
        <div className="cancel-btn" onClick={this.props.cancelAction}>取消</div>
      </div>
    )
  }
}
