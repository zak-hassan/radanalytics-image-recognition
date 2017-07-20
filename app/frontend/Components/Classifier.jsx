import React, { Component } from 'react'
import ClassificationResult from './ClassificationResult.jsx'
import $ from 'jquery'

class Classifier extends Component {

  classify(file) {
    const url = '/api/v1/imgrecogize';
    $.ajax({
      type: 'POST',
      url,
      data:file,
      success: (result) => this.props.setClassificationState(result.preds),
      error: () => console.log('Image classification failed'),
      dataType: 'json',
    })
  }

  render() {
    let classificationResults;
    //file was uploaded, time to classify
    if(this.props.file) {
      const file = this.props.file;
      this.classify(file)
    }
    //classification exists
    if(this.props.classification) {
      classificationResults = this.props.classification.map(result => {
        return (
          <ClassificationResult _class={result[0]} percent={result[1]} />
        )
      })
    }
    return (
      <div className="Classifier">
        Classification result
        {classificationResults}
      </div>
    )
  }
}

export default Classifier
