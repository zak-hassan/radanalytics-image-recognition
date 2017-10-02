import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";

class ResultHistory extends Component {
  static get propTypes() {
    return {
      results: PropTypes.array,
    }
  }

  imageFormatter(filename) {
    return <img className="img-thumb" src={"/api/v1/images/"+filename}/>;
  }

  render() {
    return (
       <div className="container container-cards-pf">
         {this.props.results &&
         <div className="card-pf card-pf-accented">
            <div className="card-pf-heading">
              <h2 className="card-pf-title">
                Results History
              </h2>
            </div>
            <div className="card-pf-body">
              <BootstrapTable data={this.props.results} hover pagination>
                <TableHeaderColumn dataAlign="center" dataField="filename" dataFormat={this.imageFormatter}>Thumbnail</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="filename" isKey={true}>Filename</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="classification">Classification</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="percentage">%</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="classification_time">Time to classify</TableHeaderColumn>
              </BootstrapTable>
            </div>
         </div>}
       </div>
    );
  }
}

export default ResultHistory;
