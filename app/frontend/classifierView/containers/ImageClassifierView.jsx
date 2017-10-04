import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageUploader from "../components/ImageUploader.jsx";
import Classifier from "../components/Classifier.jsx";
import {
  setUploadFile, setImageClassification, setSelectedOption,
  setExecutingSave,handleFeedBackPOST } from "../imageClassifierActions";
import { setMessageWithTimeout } from "../../pf-lib/message/messageActions";

class ImageClassifierView extends Component {
  static get propTypes() {
    return {
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
      handleFeedBackPOST: PropTypes.func,
    }
  }

  render() {
    return (
      <div className="ImageClassifierView">
        <div className="container container-cards-pf">
            <div className="cards col-xs-12 col-md-8 fader">
              <ImageUploader file={this.props.file}
                setUploadFile={this.props.setUploadFile}
                setMessageTimeout={this.props.setMessageTimeout}/>
              <Classifier file={this.props.file}
                classification={this.props.classification}
                setImageClassification={this.props.setImageClassification}
                setSelectedOption={this.props.setSelectedOption}
                selectedOption={this.props.selectedOption}
                setExecutingSave={this.props.setExecutingSave}
                executingSave={this.props.executingSave}
                handleFeedBackPOST={this.props.handleFeedBackPOST}
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
    setSelectedOption: (selection) => {
      dispatch(setSelectedOption(selection))
    },
    setExecutingSave: (selection) => {
      dispatch(setExecutingSave(selection))
    },
    handleFeedBackPOST: (event, selectedOption, imageFile) => {
      dispatch(handleFeedBackPOST(event, selectedOption, imageFile))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifierView);
