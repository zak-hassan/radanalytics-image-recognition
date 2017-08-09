import React,{ Component } from 'react';
import PropTypes from 'prop-types';


class ButtonComponent extends Component{
    render(){
      return (
        <a className="card-pf-link-with-icon" onClick={this.props.toggleModal}>
          <span className="pficon pficon-help"/>
          Help
        </a>
      );

    }
}

ButtonComponent.propTypes = {
  toggleModal: PropTypes.func,
};

export default ButtonComponent;

