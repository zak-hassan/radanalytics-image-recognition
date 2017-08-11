import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

class ImageUploader extends Component {

  static get propTypes() {
    return {
      file: PropTypes.object,
      setUploadFile: PropTypes.func,
      setMessageTimeout: PropTypes.func
    }
  }

  onDropAccepted(uploadFile) {
    //set new image
    this.props.setUploadFile(uploadFile[0]);
  }

  onDropRejected() {
    this.props.setMessageTimeout("Filetype not supported. Supported file types: jpg and png", "danger");
  }

  render() {
    return (
      <div className="ImageUploader">
        <div className="card-pf card-pf-accented">
          <h2 className="card-pf-title text-center">
            <span className="fa fa-upload"/><span className="card-pf-aggregate-status-count"> Upload an image</span>
          </h2>
          <div className="card-pf-body">
            <Dropzone
              className="dropzone aligner pointer" accept="image/jpg, image/jpeg, image/png"
              onDropAccepted={(files) => this.onDropAccepted(files)}
              onDropRejected={() => this.onDropRejected()}>
              {(this.props.file) && <img className="dropzone-image" src={this.props.file.preview}/>}
            </Dropzone>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
