import React, { Component } from "react";
import PropTypes from "prop-types";

class Stats extends Component {
  static get propTypes() {
    return {
      numRes: PropTypes.number,
      timeTaken: PropTypes.string,
      dateLastRes: PropTypes.string,
      timeToDownloadModel: PropTypes.string
    }
  }

  render() {
    return (
      <div className="container container-cards-pf">
        <div className="row row-cards-pf aligner">
          {this.props.numRes &&
          <div className="col-xs-10 col-md-5">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                 <div className="card-pf-aggregate-status-count">
                   <span className="fa fa-hashtag"/>Number of results
                 </div>
              </h2>
              <div className="card-pf-body">
                <p className="card-pf-aggregate-status-notifications">
                {this.props.numRes}
                </p>
              </div>
            </div>
          </div>}
          {this.props.dateLastRes &&
          <div className="col-xs-10 col-md-5">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                <div className="card-pf-aggregate-status-count">
                  <span className="fa fa-calendar"/>Last result date
                </div>
              </h2>
              <div className="card-pf-body">
                <p className="card-pf-aggregate-status-notifications">
                  {this.props.dateLastRes}
                </p>
              </div>
            </div>
          </div>}
          {this.props.timeTaken &&
          <div className="col-xs-10 col-md-5">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                <div className="card-pf-aggregate-status-count">
                  <span className="fa fa-clock-o"/>Time taken for latest
                </div>
              </h2>
              <div className="card-pf-body">
                <p className="card-pf-aggregate-status-notifications">
                  {this.props.timeTaken}
                </p>
              </div>
            </div>
          </div>}
          {this.props.timeToDownloadModel &&
          <div className="col-xs-10 col-md-5">
            <div className="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 className="card-pf-title">
                <div className="card-pf card-pf-aggregate-status">
                  <span className="fa fa-clock-o"/>Time taken to download model
                </div>
              </h2>
              <div className="card-pf-body">
                <p className="card-pf-aggregate-status-notifications">
                  {this.props.timeToDownloadModel}
                </p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
  }
}


export default Stats;
