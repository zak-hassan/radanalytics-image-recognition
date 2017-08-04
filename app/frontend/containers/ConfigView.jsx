import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import $ from 'jquery'
import {
  setConfigValues,
  setInitConfig,
  saveConfig,
  setInputStatus,
  setExecutingSaveStatus,
  setLoadingFormStatus,
} from '../actions/configActions'

import ConfigRow from '../components/ConfigRow.jsx'


class ConfigView extends Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    const url = '/api/v1/settings';
    this.props.setLoadingFormStatus(true);
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result){
        this.props.setInitConfig(result);
        this.props.setLoadingFormStatus(false);
      }.bind(this),
      error: function(){}
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const url = '/api/v1/settings';
    let payLoad = {config: this.props.futureValues};
    this.props.setExecutingSaveStatus(true);
    this.forceUpdate();
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(payLoad),
      dataType: 'json',
      contentType: 'application/json',
      success: function (result) {
        this.props.setExecutingSaveStatus(false);
        this.props.setSaveConfig(result);
        this.forceUpdate();
      }.bind(this),
      error: function (){}
    });
  }

  render() {
    if(!this.props.configValues){
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

    let buttonSpinner = null;
    if(this.props.executingSave) {
      buttonSpinner = <div className="spinner spinner-xs spinner-inline config-save-spinner"/>
    }

    let bodyHTML = null;
    if(this.props.loadingForm){
      bodyHTML =
        <div className="card-pf-footer fader aligner">
          <div className="spinner"/>
        </div>
    } else{
      bodyHTML =
        <div className="card-pf-footer fader">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            {configRows}
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button  type="submit" className="btn btn-primary">Save</button>
                {buttonSpinner}
              </div>
            </div>
          </form>
        </div>
    }

    return(
      <div className="container-fluid container-cards-pf">
        <div className="col col-cards-pf">
          <div className="col-xs-9 col-sm-12 col-md-11">
            <div className="cards col-xs-10 col-md-8 ">
              <div className="card-pf">
                <h2 className="card-pf-title">Configuration</h2>
                  {bodyHTML}
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
    configValues: state.configReducer.configValues,
    executingSave: state.configReducer.executingSave,
    futureValues: state.configReducer.futureValues,
    loadingForm: state.configReducer.loadingForm,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfigValues: (e) => {
      dispatch(setConfigValues(e))
    },
    setInitConfig: (result) => {
      dispatch(setInitConfig(result))
    },
    setSaveConfig: (result) => {
      dispatch(saveConfig(result))
    },
    setInputStatus: (key, status) => {
      dispatch(setInputStatus(key, status))
    },
    setExecutingSaveStatus: (status) => {
      dispatch(setExecutingSaveStatus(status))
    },
    setLoadingFormStatus: (status) => {
      dispatch(setLoadingFormStatus(status))
    }
  }
};

ConfigView.propTypes = {
  configValues: PropTypes.object,
  setConfigValues: PropTypes.func,
  setInitConfig: PropTypes.func,
  setSaveConfig: PropTypes.func,
  setResetConfig: PropTypes.func,
  setInputStatus: PropTypes.func,
  setExecutingSaveStatus: PropTypes.func,
  setLoadingFormStatus: PropTypes.func,
  executingSave: PropTypes.bool,
  loadingForm: PropTypes.bool,
  futureValues: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigView)

