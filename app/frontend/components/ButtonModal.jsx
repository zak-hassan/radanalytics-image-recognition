import React,{ Component } from 'react';
import PropTypes from 'prop-types';


class ButtonComponent extends Component{

  constructor(props){
    super(props);
    this.openModel = this.openModel.bind(this);
  }

  openModel(){
    this.props.toggleModal();
  }

  render(){
    return (
      <a className="card-pf-link-with-icon" onClick={this.openModel}>
        <span className="pficon pficon-help"/>
        Help
      </a>
    );

  }
}

ButtonComponent.propTypes = {
  toggleModal: PropTypes.func,
  mid: PropTypes.string,
};

export default ButtonComponent;

