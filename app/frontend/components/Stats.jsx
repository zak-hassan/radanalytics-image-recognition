import React, { Component } from "react"
import PropTypes from "prop-types"

class Stats extends Component {

  static get propTypes() {
    return {
      numRes: PropTypes.number,
      timeTaken: PropTypes.string,
      dateLastRes: PropTypes.string
    }
  }

  render() {
    return (
      <div className="container container-cards-pf">
        <div className="row row-cards-pf">
          {this.props.numRes &&
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Number of results
              </h2>
              <div className="card-pf-body">
                {this.props.numRes}
              </div>
            </div>
          </div>}
          {this.props.dateLastRes &&
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Last result date
              </h2>
              <div className="card-pf-body">
                {this.props.dateLastRes}
              </div>
            </div>
          </div>}
          {this.props.timeTaken &&
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Time taken for latest
              </h2>
              <div className="card-pf-body">
                {this.props.timeTaken}
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default Stats
