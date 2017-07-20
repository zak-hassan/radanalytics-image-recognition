import React, { Component } from 'react'

class ClassificationResult extends Component {

  render() {
    return (
      <div className="Result"> {this.props.className} - {this.props.percent} </div>
    )
  }
}

export default ClassificationResult
