import React, { Component } from 'react'

class Stats extends Component {

  render() {
    return(
      <div className="container container-cards-pf">
        <div className="row row-cards-pf">
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Number of results
              </h2>
              <div className="card-pf-body">
                 Results
              </div>
            </div>
          </div>
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Last result date
              </h2>
              <div className="card-pf-body">
                 Last result date
              </div>
            </div>
          </div>
          <div className="col-xs-8 col-md-4">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 Time taken for latest
              </h2>
              <div className="card-pf-body">
                 Time taken
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats
