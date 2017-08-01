import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImageUploader from '../components/ImageUploader.jsx'
import Classifier from '../components/Classifier.jsx'
import { setUploadFile, setImageClassification } from '../actions/imageClassifierActions'

class ImageClassifierView extends Component {
  render() {
    return(
      <div className="container-fluid container-cards-pf">
        <div className="col col-cards-pf">
          <div className="cards col-xs-10 col-md-8 ">
            <ImageUploader file={this.props.file}
              setUploadFile={this.props.setUploadFile}/>
            <Classifier file={this.props.file}
              classification={this.props.classification}
              setImageClassification={this.props.setImageClassification}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.imageClassificationReducer.file,
    classification: state.imageClassificationReducer.classification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setImageClassification: (file) => {
          dispatch(setImageClassification(file))
      },
      setUploadFile: (file) => {
          dispatch(setUploadFile(file))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifierView)
