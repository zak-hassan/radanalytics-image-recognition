import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ImageUploader from "../components/ImageUploader.jsx";
import Classifier from "../components/Classifier.jsx";
import { setUploadFile, setImageClassification, setSelectedOption, setExecutingSave } from "../actions/imageClassifierActions";
import { setMessageWithTimeout } from "../actions/messageActions";
import { toggleClassModal } from '../actions/modalActions';

class ImageClassifierView extends Component {

  render() {
    return (
      <div className="ImageClassifierView">
        <div className="container container-cards-pf">
            <div className="cards col-xs-12 col-md-8">
              <ImageUploader file={this.props.file}
                setUploadFile={this.props.setUploadFile}
                setMessageTimeout={this.props.setMessageTimeout}/>
              <Classifier file={this.props.file}
                classification={this.props.classification}
                setImageClassification={this.props.setImageClassification}
                toggleModal={this.props.toggleModal}
                modalState={this.props.modalState}
                setSelectedOption={this.props.setSelectedOption}
                selectedOption={this.props.selectedOption}
                setExecutingSave={this.props.setExecutingSave}
                executingSave={this.props.executingSave}
                setMessageTimeout={this.props.setMessageTimeout}
                setMessageWithTimeout={this.props.setMessageWithTimeout}
              />
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.imageClassificationReducer.file,
    classification: state.imageClassificationReducer.classification,
    modalState: state.modalReducer.class_modal,
    selectedOption: state.imageClassificationReducer.selectedOption,
    executingSave: state.imageClassificationReducer.executingSave,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setImageClassification: (file) => {
      dispatch(setImageClassification(file))
    },
    setUploadFile: (file) => {
      dispatch(setUploadFile(file))
    },
    setMessageTimeout: (msg, errorType) => {
      dispatch(setMessageWithTimeout(msg, errorType))
    },
    setMessageWithTimeout: (msg, type) => {
      dispatch(setMessageWithTimeout(msg, type))
    },
    toggleModal: () => {
      dispatch(toggleClassModal())
    },
    setSelectedOption: (selection) => {
      dispatch(setSelectedOption(selection))
    },
    setExecutingSave: (selection) => {
      dispatch(setExecutingSave(selection))
    },
  }
};

ImageClassifierView.propTypes = {
  file: PropTypes.object,
  classification: PropTypes.array,
  setUploadFile: PropTypes.func,
  setImageClassification: PropTypes.func,
  setMessageTimeout: PropTypes.func,
  toggleModal: PropTypes.func,
  modalState: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.number,
  setMessageWithTimeout: PropTypes.func,
  setMessage: PropTypes.func,
  executingSave: PropTypes.bool,
  setExecutingSave: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifierView);
