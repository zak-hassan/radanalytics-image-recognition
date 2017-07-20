import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class ImageUploader extends Component {

  onDrop(uploadFile) {
    this.props.setFileState(uploadFile[0])
  }

  render() {
    return (
      <div className="ImageUploader">
        <Dropzone onDrop={(files) => this.onDrop(files)}>
          <div> Drop a file here or click to select a file to upload</div>
        </Dropzone>
      </div>
    )
  }
}

export default ImageUploader
