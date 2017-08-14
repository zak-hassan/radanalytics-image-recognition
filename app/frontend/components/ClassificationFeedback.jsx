import React, { Component } from "react";
import ModalComponentDialog from '../components/ModalWindow.jsx'
import PropTypes from "prop-types";
import $ from 'jquery'

class ClassificationFeedback extends Component {
  static get propTypes() {
    return {
      imageFile: PropTypes.object,
      toggleModal: PropTypes.func,
      modalState: PropTypes.bool,
      setSelectedOption: PropTypes.func,
      selectedOption: PropTypes.number,
      setMessageWithTimeout: PropTypes.func,
      setMessage: PropTypes.func,
      executingSave: PropTypes.bool,
      setExecutingSave: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleFormSubmit(e){
    e.preventDefault();
    // Do a post request then close mdoal
    let formData = new FormData();
    formData.append("file", this.props.imageFile);
    formData.append("option", this.props.selectedOption);
    const url = '/api/v1/stats';
    this.props.setExecutingSave(true);
    this.props.toggleModal();
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
        this.props.setExecutingSave(false);
        this.props.setMessageWithTimeout('Feedback stored successfully, thank you!', "success");
      }.bind(this),
      error: function (){
        this.props.setExecutingSave(false);
        this.props.setMessage('Could not successfully send information to server', "danger");
      }.bind(this)
    });

  }

  handleOptionChange(e){
    this.props.setSelectedOption(Number.parseInt(e.target.value));
  }

  createModalFooter(){
    return (
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleFormSubmit}>Save</button>
      </div>
    )
  }

  createModalContent(){
    return (
      <div className="container">
        <p> Please rate the accuracy of the results! </p>
        <form onSubmit={this.handleFormSubmit}>
          <div className="radio">
            <label>
              <input type="radio" value={1}
                     checked={this.props.selectedOption === 1}
                     onChange={this.handleOptionChange} />
              Top Choice
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value={2}
                     checked={this.props.selectedOption === 2}
                     onChange={this.handleOptionChange}/>
              Within the top 5 choices
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value={3}
                     checked={this.props.selectedOption === 3}
                     onChange={this.handleOptionChange}/>
              None of the above!
            </label>
          </div>
        </form>
      </div>
    );
  }

  render() {
    let content = this.createModalContent();
    return (
      <ModalComponentDialog isOpen={this.props.modalState}
        toggleModal={this.props.toggleModal}
        modalTitle={"Classification Feedback"}
        modalContent={content}
        modalFooter={this.createModalFooter()}/>
    );
  }
}


export default ClassificationFeedback;

