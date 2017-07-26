import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

class ImageUploader extends Component {

  onDrop(uploadFile) {
    this.props.setFileState(uploadFile[0])
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
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageUploader

ImageUploader.propTypes = {
  setFileState: PropTypes.func
}
