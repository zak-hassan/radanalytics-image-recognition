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
import ButtonComponent from '../components/ButtonModal.jsx';
import {toggleModal} from '../actions/modalActions';
import ConfigRow from '../components/ConfigRow.jsx'
import ModalComponentDialog from '../components/ModalWindow.jsx'

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
    /* Config table is not rendered if we have no values */
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

    /*  Spinner for the pending POST request. */
    let buttonSpinner = null;
    if(this.props.executingSave) {
      buttonSpinner = <div className="spinner spinner-inline config-save-spinner"/>
    }

    /* While the GET request to server is pending, show spinner. */
    let bodyHTML = null;
    if(this.props.loadingForm){
      bodyHTML =
        <div className="card-pf-footer fader aligner">
          <div className="spinner"/>
        </div>
    } else{
      bodyHTML =
        <div className="card-pf-footer fader">
          <form className="form-horizontal">
            {configRows}
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
              </div>
            </div>
          </form>
        </div>
    }

    let saveButton = <button  onClick={this.handleSubmit} className="btn btn-primary">Save</button>;

    let title = <h2 className="card-pf-title">Configuration</h2>;

    let footer =
      <div className="container card-pf-footer card-pf fader autowidth">
        <div className="col-xs-6 col-sm-6">
            <ButtonComponent toggleModal={this.props.toggleModal}/>
            <ModalComponentDialog isOpen={this.props.modalStatus} toggleModal={this.props.toggleModal}/>
        </div>

        <div className="col-xs-6 col-sm-6">
          <div className="pull-right aligner">
            {buttonSpinner}
            {saveButton}
          </div>
        </div>

      </div>;

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
    modalStatus: state.modalReducer.modalState
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
    },

    toggleModal: () => {
      dispatch(toggleModal())
    },
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
  toggleModal: PropTypes.func,
  modalStatus: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigView)

