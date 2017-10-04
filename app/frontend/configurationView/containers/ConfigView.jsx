import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  setConfigValues,
  setInputStatus,
  resetConfig,
  handleConfigPOST,
  handleConfigGET,
} from '../configActions'
import ButtonComponent from '../../pf-lib/modal/containers/ButtonModal.jsx';
import ConfigRow from '../components/ConfigRow.jsx'
import ModalComponentDialog from '../../pf-lib/modal/containers/ModalWindow.jsx'
import { setMessage, setMessageWithTimeout } from "../../pf-lib/message/messageActions"
import { MODALS } from "../../configs.jsx"

class ConfigView extends Component {
  static get propTypes() {
    return {
      configValues: PropTypes.object,
      setConfigValues: PropTypes.func,
      setInputStatus: PropTypes.func,
      executingSave: PropTypes.bool,
      loadingForm: PropTypes.bool,
      futureValues: PropTypes.object,
      resetConfig: PropTypes.func,
      handleConfigGET: PropTypes.func,
      handleConfigPOST: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this)
  }

  componentWillMount(){
    this.props.handleConfigGET();
  }

  handleSubmit(event){
    this.props.handleConfigPOST(event, this.props.futureValues);
  }

  handleReset(){
    this.props.resetConfig()
  }

  createConfigRows(){
    let configKeys = Object.keys(this.props.configValues);
    return configKeys.map((key, i) => {
      return (
        <ConfigRow  key={i}
                    configKey={key}
                    configValue={this.props.configValues[key]}
                    setConfigValues={this.props.setConfigValues}
                    setInputStatus={this.props.setInputStatus}/>
      )
    });
  }

  createModalComponent(){
    let modalTitle = "Configuration Help";

    let configValues = this.props.configValues;
    let keys = Object.keys(configValues);
    let modalContent = keys.map((key, i) => {
      return <div key={i}>
        <label>{key}</label>
        <p>{configValues[key].description}</p>
      </div>
    });
    modalContent = <div>{modalContent}</div>;
    return <ModalComponentDialog mid={MODALS.CONFIG_HELP_MODAL}
                                 modalTitle={modalTitle}
                                 modalContent={modalContent}/>
  }

  createFooter(){
    /*  Spinner for the pending POST request. */
    let buttonSpinner = null;

    let helpButton =
      <a className="card-pf-link-with-icon" >
        <span className="pficon pficon-help"/>
        Help
      </a>;

    if(this.props.executingSave) {
      buttonSpinner = <div className="spinner spinner-inline config-save-spinner"/>
    }

    let saveButton = <button  onClick={this.handleSubmit} className="btn btn-primary">Save</button>;
    let resetButton = <button onClick={this.handleReset} className="btn btn-primary m-r-8">Reset</button>;

    return <div className="container card-pf-footer card-pf fader autowidth">
      <div className="col-xs-6 col-sm-6">
        <ButtonComponent mid={MODALS.CONFIG_HELP_MODAL}
                         content={helpButton}/>
        {this.createModalComponent()}
      </div>
      <div className="col-xs-6 col-sm-6">
        <div className="pull-right aligner">
          {buttonSpinner}
          {resetButton}
          {saveButton}
        </div>
      </div>
    </div>;
  }

  createBody(configRows){
    if(this.props.loadingForm){
      /* While the GET request to server is pending, show spinner. */
      return (
        <div className="card-pf-footer fader aligner">
          <div className="spinner"/>
        </div>
      )
    } else {
      return <div className="card-pf-footer fader">
        <form className="form-horizontal">
          {configRows}
        </form>
      </div>
    }
  }

  render() {
    /* Config table is not rendered if we have no values */
    if(!this.props.configValues){
      return null
    }

    let configRows = this.createConfigRows();
    let bodyHTML = this.createBody(configRows);
    let title = <h2 className="card-pf-title">Configuration</h2>;
    let footer = this.createFooter();

    return(
      <div className="col col-cards-pf container-cards-pf">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf">
            {title}
            {bodyHTML}
            {footer}
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
    setInputStatus: (key, status) => {
      dispatch(setInputStatus(key, status))
    },
    setMessageWithTimeout: (msg, type) => {
      dispatch(setMessageWithTimeout(msg, type))
    },
    resetConfig: () => {
      dispatch(resetConfig())
    },
    setMessage: (msg, type) => {
      dispatch(setMessage(msg, type))
    },
    handleConfigGET: () => {
      dispatch(handleConfigGET())
    },
    handleConfigPOST: (event, futureValues) => {
      dispatch(handleConfigPOST(event, futureValues))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigView)

