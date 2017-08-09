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

  createModalContent(){
    return (
      <div className="container">
        <label className="radio">
          <input type="radio" name="options" id="top1" /> Top result
        </label>
        <label className="radio">
          <input type="radio" name="options" id="top5" /> In the top 5
        </label>
        <label className="radio">
          <input type="radio" name="options" id="none" /> Not in the top 5
        </label>
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

