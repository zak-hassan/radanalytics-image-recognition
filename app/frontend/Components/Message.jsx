import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {

  static get propTypes() {
    return {
      msg: PropTypes.array,
      visible: PropTypes.bool,
      setVis : PropTypes.func
    }
  }

  handleClick() {
    this.props.setVis(!this.props.visible)
  }

  render() {
    if(this.props.visible && this.props.msg) {

      const message = this.props.msg[0]
      const type = this.props.msg[1]
      const icon = type === 'danger' ? 'error-circle-o' : 'ok'

      return (
        <div >
          <div className={"alert alert-" + type + " alert-dismissable"}>
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={this.handleClick.bind(this)}>
              <span className="pficon pficon-close"></span>
            </button>
            <span className={"pficon pficon-"+icon}></span>
            {message}
          </div>
        </div>
      )
    }
    return null
  }
}

export default Message
