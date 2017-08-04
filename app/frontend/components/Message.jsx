import React, { Component } from "react"
import PropTypes from "prop-types"

class Message extends Component {

  static get propTypes() {
    return {
      message: PropTypes.string,
      messageType: PropTypes.string,
      icon: PropTypes.string,
      visible: PropTypes.bool,
      clearMessage: PropTypes.func
    }
  }

  handleClick() {
    this.props.clearMessage()
  }

  render() {
    if(this.props.visible) {
      return (
        <div>
          <div className={"alert alert-" + this.props.messageType + " alert-dismissable"}>
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={this.handleClick.bind(this)}>
              <span className="pficon pficon-close"></span>
            </button>
            <span className={"pficon pficon-" + this.props.icon}></span>
            {this.props.message}
          </div>
        </div>
      )
    }
    return null
  }
}

export default Message
