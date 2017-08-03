import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ResultHistory extends Component {

  render() {
    const data = [{filename:"test", class:"test", percentage:10}]
    return (
      <div className="ResultsHistory">
        <BootstrapTable className="table table-striped table-bordered table-hover" data={data}>
          <TableHeaderColumn dataField='filename' isKey={true}>Filename</TableHeaderColumn>
          <TableHeaderColumn dataField='class'>Classification</TableHeaderColumn>
          <TableHeaderColumn dataField='percentage'>%</TableHeaderColumn>
        </BootstrapTable>
      </div>

    )
  }
}

export default ResultHistory
