import React, { Component } from "react";
import ModalComponentDialog from '../components/ModalWindow.jsx'
import PropTypes from "prop-types";

class ClassificationFeedback extends Component {

  static get propTypes() {
    return {
      toggleModal: PropTypes.func,
      modalState: PropTypes.bool
    }
  }

  submitFeedback(){
    this.props.toggleModal;
  }

  createModalContent(){
    return (
      <div className="container">
        <div>
          <a>Top result</a>
        </div>
        <div>
          <a>In the top 5</a>
        </div>
        <div>
          <a>Not in the top 5</a>
        </div>
      </div>
    );
  }

  render() {
    let content = this.createModalContent();
    return (
      <ModalComponentDialog isOpen={this.props.modalState}
        toggleModal={this.props.toggleModal}
        modalTitle={"Classification Feedback"}
        modalContent={content}/>
    );
  }
}

export default ClassificationFeedback;

