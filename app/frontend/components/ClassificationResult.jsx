import React, { Component } from "react"
import PropTypes from "prop-types"

class ClassificationResult extends Component {

  static get propTypes(){
    return {
      value: PropTypes.number,
      _class: PropTypes.string
    }
  }

  render() {

    var barWidth = this.props.value + "%"

    return (
      <div className="ClassificationResult">
        <div className="progress-description">
        {this.props._class}
        </div>
          <div className="progress progress-label-top-right">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={this.props.value} aria-valuemin="0" aria-valuemax="100" style={{width: barWidth}} >
              <span>{this.props._class} - {this.props.value}</span>
            </div>
          </div>
      </div>
    )
  }
}

export default ClassificationResult
