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
      setMessage: PropTypes.func
    }
  }

  classify(file) {
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
          this.props.setMessage('Successfully uploaded image', 'success')
          this.props.setClassificationState(result.pred)
      }.bind(this),
      error: function(error) {
          this.props.setMessage(error, 'danger')
      }.bind(this)
    })
  }

  componentWillUpdate(nextProps) {
    //file was uploaded, time to classify
    if(nextProps.file !== this.props.file) {
      const file = nextProps.file;
      this.classify(file)
    }
  }

  render() {
    let classificationResults;
    //classification exists
    if(this.props.classification) {
      classificationResults = this.props.classification.map(result => {
        return (
          <ClassificationResult key={result[1]} _class={result[1]} value={result[0]} />
        )
      })

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
