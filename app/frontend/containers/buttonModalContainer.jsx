import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/modalActions';

class ButtonComponent extends Component{
    render(){
      const {toggleModal} = this.props;
      return (<button onClick={toggleModal}>Click Me !!</button>);
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleModal
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ButtonComponent);

ButtonComponent.propTypes = {
  toggleModal: PropTypes.func,
};