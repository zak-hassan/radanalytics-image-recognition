import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from "../components/ButtonModal.jsx";

class FeedbackLinkModal extends Component{

  static get propTypes() {
    return {
      toggleModal: PropTypes.func,
    }
  }

  render(){
    let link = <a>Classification feedback</a>;
    return (
      <ButtonComponent toggleModal={this.props.toggleModal} content={link}/>
    );
  }
}

export default FeedbackLinkModal;