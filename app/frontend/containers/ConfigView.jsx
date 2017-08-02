import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { setConfigValues, setInitConfig } from '../actions/configActions'

class ConfigView extends Component {
  render() {

    if (!this.props.configValues) {
      this.props.setInitConfig();
    }

    let configRows = this.props.configValues.map((result, i) => {
      return (
        <ConfigRow key={i}
                   configKey={result[1]}
                   configValue={result[2]}
                   setConfigValues={this.props.setConfigValues}/>
      )
    });

    return(
      <div className="container-fluid container-cards-pf">
        <div className="col col-cards-pf">
          <div className="cards col-xs-10 col-md-8 ">
            <h2> Configuration </h2>
            {configRows}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configValues: state.configValues
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfigValues: (updatedValues) => {
      dispatch(setConfigValues(updatedValues))
    },
    setInitConfig: () => {
      dispatch(setInitConfig())
    }
  }
};

ConfigView.propTypes = {
  configValues: PropTypes.object,
  setConfigValues: PropTypes.func,
  setInitConfig: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigView)

