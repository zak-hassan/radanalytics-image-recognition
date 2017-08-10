import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ImageUploader from "../components/ImageUploader.jsx";
import Classifier from "../components/Classifier.jsx";
import { setUploadFile, setImageClassification } from "../actions/imageClassifierActions";
import { setMessageWithTimeout } from "../actions/messageActions";
import { toggleClassModal } from '../actions/modalActions';

class ImageClassifierView extends Component {

  static get propTypes() {
    return {
      file: PropTypes.object,
      classification: PropTypes.array,
      setUploadFile: PropTypes.func,
      setImageClassification: PropTypes.func,
      setMessageTimeout: PropTypes.func,
      toggleModal: PropTypes.func,
      modalState: PropTypes.bool
    }
  }

  render() {
    return (
      <div className="ImageClassifierView">
        <div className="container container-cards-pf">
          <div className="col col-cards-pf">
            <div className="cards col-xs-6 col-md-12">
              <ImageUploader file={this.props.file}
                setUploadFile={this.props.setUploadFile}
                setMessageTimeout={this.props.setMessageTimeout}/>
              <Classifier file={this.props.file}
                classification={this.props.classification}
                setImageClassification={this.props.setImageClassification}
                toggleModal={this.props.toggleModal}
                modalState={this.props.modalState}/>
            </div>
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
    modalState: state.modalReducer.class_modal
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
      toggleModal: () => {
        dispatch(toggleClassModal())
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifierView);
