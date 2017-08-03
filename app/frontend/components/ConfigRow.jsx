import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ConfigRow extends Component{
  render(){
    let fieldName = this.props.configKey;
    return(
      <div className="form-group">
        <label className="col-sm-2 control-label" >
          {fieldName}
        </label>

        <div className="col-sm-8 formValues">
          <input  className="form-control"
                  name={fieldName}
                  type="text"
                  onChange={this.props.setConfigValues}
                  placeholder={this.props.configValue}/>
        </div>

        <div className="col-sm-2">
          <button className="btn btn-default">Edit</button>
        </div>

      </div>
    )
  }
}

ConfigRow.propTypes = {
  configKey: PropTypes.string,
  configValue: PropTypes.string,
  setConfigValues: PropTypes.func,
};