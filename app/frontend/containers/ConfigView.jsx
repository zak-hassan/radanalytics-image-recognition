import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { setConfigValues, setInitConfig, saveConfig, resetConfig, setInputStatus} from '../actions/configActions'
import ConfigRow from '../components/ConfigRow.jsx'

class ConfigView extends Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    this.props.setInitConfig();
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.setSaveConfig();
    this.props.setInitConfig();
    this.forceUpdate();
  }

  render() {
    if(!this.props.configValues){
      console.log('Configuration could not be loaded.');
      return null
    }

    let configKeys = Object.keys(this.props.configValues);
    let configRows = configKeys.map((key, i) => {
      return (
        <ConfigRow  key={i}
                    configKey={key}
                    configValue={this.props.configValues[key]}
                    setConfigValues={this.props.setConfigValues}
                    setInputStatus={this.props.setInputStatus}/>
      )
    });

    return(
      <div className="container-fluid container-cards-pf">
        <div className="col col-cards-pf">
          <div className="col-xs-9 col-sm-12 col-md-11">
            <div className="cards col-xs-10 col-md-8 ">
              <div className="card-pf">
                <h2 className="card-pf-title">Configuration</h2>
                <div className="card-pf-footer fader">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                      {configRows}
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button  type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configValues: state.configReducer.configValues
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfigValues: (e) => {
      dispatch(setConfigValues(e))
    },
    setInitConfig: () => {
      dispatch(setInitConfig())
    },
    setSaveConfig: () => {
      dispatch(saveConfig())
    },
    setResetConfig: () => {
      dispatch(resetConfig())
    },
    setInputStatus: (key, status) => {
      dispatch(setInputStatus(key, status))
    }
  }
};

ConfigView.propTypes = {
  configValues: PropTypes.object,
  setConfigValues: PropTypes.func,
  setInitConfig: PropTypes.func,
  setSaveConfig: PropTypes.func,
  setResetConfig: PropTypes.func,
  setInputStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigView)

