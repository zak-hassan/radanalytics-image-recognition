import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ConfigRow extends Component{

  constructor(){
    super();
    this.handleEnableEdit = this.handleEnableEdit.bind(this)
  }

  handleEnableEdit(event){
    event.preventDefault();
    this.props.setInputStatus(this.props.configKey, true);
    this.forceUpdate();
  }

  render(){
    let fieldName = this.props.configKey;
    let inputField = null;

    /* Show edit field when edit button is clicked. */
    if (this.props.configValue.active){
      inputField = <input  className="form-control fader"
                           name={fieldName}
                           type="text"
                           onChange={this.props.setConfigValues}
                           placeholder={this.props.configValue.placeholder}/>
    } else {
      inputField =
        <div className="inputField"> {this.props.configValue.placeholder}
          <div className="pficon pficon-edit editIcon" onClick={this.handleEnableEdit}/>
        </div>
    }

    return(
      <div className="form-group wordwrapper">
        <label className="col-sm-4 control-label" >
          {fieldName}
        </label>

        <div className="col-sm-7 wordwrapper">
          {inputField}
        </div>
      </div>

    )
  }
}

ConfigRow.propTypes = {
  configKey: PropTypes.string,
  configValue: PropTypes.object,
  setConfigValues: PropTypes.func,
  setInputStatus: PropTypes.func,
};