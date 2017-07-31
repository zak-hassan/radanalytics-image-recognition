import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import { setUploadFile } from '../actions/imageClassifierActions'

class ImageUploader extends Component {

  onDrop(uploadFile) {
    //set new image
    this.props.setUploadFile(uploadFile[0])
  }

  render() {
    return (
      <div className="ImageUploader">
        <div className="card-pf card-pf-accented">
          <h2 className="card-pf-title text-center">
            <span className="fa fa-upload"></span><span className="card-pf-aggregate-status-count"> Upload an image</span>
          </h2>
          <div className="card-pf-body">
            <Dropzone
              className="dropzone"
              onDrop={(files) => this.onDrop(files)}>
              {(this.props.file) && <img className="dropzone-image" src={this.props.file.preview}/>}
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.imageClassificationReducer.file
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUploadFile: (file) => {
            dispatch(setUploadFile(file))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
