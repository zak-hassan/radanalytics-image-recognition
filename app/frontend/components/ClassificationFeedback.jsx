import React, { Component } from "react";
import ModalComponentDialog from '../components/ModalWindow.jsx'
import PropTypes from "prop-types";
import $ from 'jquery'

class ClassificationFeedback extends Component {
  constructor(){
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleFormSubmit(e){
    e.preventDefault();
    // Do a post request then close
    console.log('You have selected:', this.props.selectedOption);
    let formData = new FormData();
    formData.append("file", this.props.imageFile);
    formData.append("option", this.props.selectedOption);
    const url = '/api/v1/stats';
    this.props.setExecutingSave(true);

    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
        this.props.toggleModal();
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

  createModalContent(){
    return (

      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="radio">
            <label>
              <input type="radio" value={1} checked={this.props.selectedOption === 1} onChange={this.handleOptionChange} />
              Option 1
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value={2} checked={this.props.selectedOption === 2} onChange={this.handleOptionChange}/>
              Option 2
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value={3} checked={this.props.selectedOption === 3} onChange={this.handleOptionChange}/>
              Option 3
            </label>
          </div>
          <button className="btn btn-default" type="submit">Save</button>
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
        modalContent={content}/>
    );
  }
}

ClassificationFeedback.propTypes = {
  imageFile: PropTypes.object,
  toggleModal: PropTypes.func,
  modalState: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.number,
  setMessageWithTimeout: PropTypes.func,
  setMessage: PropTypes.func,
  executingSave: PropTypes.bool,
  setExecutingSave: PropTypes.func,
};

export default ClassificationFeedback;

