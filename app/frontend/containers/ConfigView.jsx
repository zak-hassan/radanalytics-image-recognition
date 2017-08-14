import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  setConfigValues,
  setInputStatus,
  resetConfig,
  handleConfigPOST,
  handleConfigGET,
} from '../actions/configActions'
import ButtonComponent from '../components/ButtonModal.jsx';
import {toggleConfigModal} from '../actions/modalActions';
import ConfigRow from '../components/ConfigRow.jsx'
import ModalComponentDialog from '../components/ModalWindow.jsx'
import { setMessage, setMessageWithTimeout } from "../actions/messageActions"

class ConfigView extends Component {
  static get propTypes() {
    return {
      configValues: PropTypes.object,
      setConfigValues: PropTypes.func,
      setInputStatus: PropTypes.func,
      executingSave: PropTypes.bool,
      loadingForm: PropTypes.bool,
      futureValues: PropTypes.object,
      toggleModal: PropTypes.func,
      modalState: PropTypes.bool,
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
    return <ModalComponentDialog isOpen={this.props.modalState}
                                  toggleModal={this.props.toggleModal}
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
        <ButtonComponent toggleModal={this.props.toggleModal}
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
    modalState: state.modalReducer.config_modal
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
    toggleModal: () => {
      dispatch(toggleConfigModal())
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

