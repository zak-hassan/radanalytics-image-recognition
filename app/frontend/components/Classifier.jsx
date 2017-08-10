import React, { Component } from "react";
import PropTypes from "prop-types";

import ClassificationResult from "../components/ClassificationResult.jsx";
import ClassificationFeedback from "../components/ClassificationFeedback.jsx";
import FeedbackLinkModal from "../components/FeedbackLinkModal.jsx";

class Classifier extends Component {

  classify(file) {
    //set classification
    this.props.setImageClassification(file);
  }

  componentWillUpdate(nextProps) {
    //file a new file was uploaded, time to classify
    if(nextProps.file !== this.props.file) {
      const file = nextProps.file;
      this.classify(file);
    }
  }

  render() {
    let classificationResults
    //classification exists
    if(this.props.classification) {
      classificationResults = this.props.classification.map(result => {
        return (
          <ClassificationResult key={result[1]} _class={result[1]} value={result[0]}/>
        );
      })
    //otherwise, load a spinner
    } else {
      classificationResults = <div className="spinner spinner-xs spinner-inline"/>;
    }

    //if a file is uploaded, display results
    return (
      <div className="Classifier">
        {this.props.file &&
        <div className="card-pf card-pf-accented">
          <div className="card-pf-heading">
            <h2 className="card-pf-title">
              Classification Results
            </h2>
          </div>
          <div className="card-pf-body">
            {classificationResults}
            {this.props.classification &&
            <div className="resultsFeedback">
              <FeedbackLinkModal toggleModal={this.props.toggleModal}/>
              <ClassificationFeedback
                toggleModal={this.props.toggleModal}
                modalState={this.props.modalState}
                selectedOption={this.props.selectedOption}
                setSelectedOption={this.props.setSelectedOption}
                setExecutingSave={this.props.setExecutingSave}
                executingSave={this.props.executingSave}
                setMessageTimeout={this.props.setMessageTimeout}
                setMessageWithTimeout={this.props.setMessageWithTimeout}
                imageFile={this.props.file}
              />
            </div>}
          </div>
        </div>}
      </div>
    );
  }
}

Classifier.propTypes = {
  classification: PropTypes.array,
  file: PropTypes.object,
  setImageClassification: PropTypes.func,
  toggleModal: PropTypes.func,
  modalState: PropTypes.bool,
  selectedOption: PropTypes.number,
  setSelectedOption: PropTypes.func,
  setMessageTimeout: PropTypes.func,
  setMessageWithTimeout: PropTypes.func,
  setMessage: PropTypes.func,
  executingSave: PropTypes.bool,
  setExecutingSave: PropTypes.func,

};
export default Classifier;
