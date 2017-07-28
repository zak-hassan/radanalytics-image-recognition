import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassificationResult from './ClassificationResult.jsx'
import $ from 'jquery'

class Classifier extends Component {

  static get propTypes(){
    return {
      classification: PropTypes.array,
      file: PropTypes.object,
      setClassificationState: PropTypes.func,
      setMessage: PropTypes.func,
      setMessageVis: PropTypes.func,
      setFileState: PropTypes.func
    }
  }

  classify(file) {
    //clear previous state
    this.props.setClassificationState(null)
    //clear previous message
    this.props.setMessageVis(false)

    var formData = new FormData();
    formData.append('file', file);

    const url = '/api/v1/imgrecognize';
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: false,
      processData: false,
      success: function(result) {
          this.props.setMessage('Successfully classified image', 'success')
          this.props.setClassificationState(result.pred)
      }.bind(this),
      error: function(error) {
          this.props.setFileState(null)
          this.props.setMessage(error, 'danger')
      }.bind(this)
    })
  }

  componentWillUpdate(nextProps) {
    //file a new file was uploaded, time to classify
    if(nextProps.file !== this.props.file) {
      const file = nextProps.file;
      this.classify(file)
    }
  }

  render() {
    let classificationResults
    //classification exists
    if(this.props.classification) {
      classificationResults = this.props.classification.map(result => {
        return (
          <ClassificationResult key={result[1]} _class={result[1]} value={result[0]} />
        )
      })
    //otherwise, load a spinner
    } else {
      classificationResults = <div className="spinner spinner-xs spinner-inline"></div>
    }

    //if a file is uploaded, display results
    if(this.props.file) {
      return (
        <div className="Classifier">
          <div className="card-pf card-pf-accented">
            <div className="card-pf-heading">
              <h2 className="card-pf-title">
                Classification Results
              </h2>
            </div>
            <div className="card-pf-body">
              {classificationResults}
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default Classifier
