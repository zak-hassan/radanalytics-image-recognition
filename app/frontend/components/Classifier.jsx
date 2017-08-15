import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassificationResult from "../components/ClassificationResult.jsx";
import ClassificationFeedback from "../components/ClassificationFeedback.jsx";
import ButtonComponent from '../components/ButtonModal.jsx';

class Classifier extends Component {
  static get propTypes() {
    return {
      classification: PropTypes.array,
      file: PropTypes.object,
      setImageClassification: PropTypes.func,
      toggleModal: PropTypes.func,
      modalState: PropTypes.bool,
      selectedOption: PropTypes.number,
      setSelectedOption: PropTypes.func,
      executingSave: PropTypes.bool,
      handleFeedBackPOST: PropTypes.func,
    }
  }

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

  createClassificationResults(){
    //classification exists
    if(this.props.classification) {
      return this.props.classification.map(result => {
        return (
          <ClassificationResult key={result[1]} _class={result[1]} value={result[0]}/>
        );
      })
      //otherwise, load a spinner
    } else {
      return (
        <div className="aligner">
          <div className="spinner"/>
        </div>
      )
    }
  }

  createHeader(){

    // Do not display footer until classification results have been returned
    if (!this.props.classification){
      return (
        <div className="card-pf-heading">
          <h2 className="card-pf-title">
            Classification Results
          </h2>
        </div>
      )
    }

    /*  Spinner for the pending POST request. */
    let feedBackButton = null;
    let content = <span className="fa fa-2x fa-comments-o pull-right pf-blue"/>;

    if(this.props.executingSave) {
      feedBackButton = <div className="spinner spinner-inline config-save-spinner pull-right"/>
    } else {
      feedBackButton = <ButtonComponent toggleModal={this.props.toggleModal} content={content}/>
    }

    return (
      <div className="card-pf-heading aligner">
        <div className="col-xs-6 col-sm-6 no-padding">
          <h4 className="pull-left card-pf-title">
              Classification Results
          </h4>
        </div>
        <div className="col-xs-6 col-sm-6 no-padding">
          {feedBackButton}
        </div>
        <div className="clearfix"/>
      </div>)
  }

  render() {
    let classificationResults = this.createClassificationResults();

    //if a file is uploaded, display results
    return (
      <div className="Classifier">
        {this.props.file &&
        <div className="card-pf card-pf-accented">
          {this.createHeader()}
          <div className="card-pf-body">
            {classificationResults}
            {this.props.classification &&
            <div className="resultsFeedback">
              <ClassificationFeedback
                imageFile={this.props.file}
                toggleModal={this.props.toggleModal}
                modalState={this.props.modalState}
                selectedOption={this.props.selectedOption}
                setSelectedOption={this.props.setSelectedOption}
                handleFeedBackPOST={this.props.handleFeedBackPOST}
              />
            </div>}
          </div>
        </div>}
      </div>
    );
  }
}


export default Classifier;
