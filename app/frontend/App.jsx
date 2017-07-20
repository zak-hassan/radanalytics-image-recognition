import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ImageUploader from './Components/ImageUploader.jsx'
import Classifier from './Components/Classifier.jsx'

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      file:null,
      classification:null
    }
  }

  setFileState(fileUpload) {
    this.setState({file:fileUpload})
  }

  setClassificationState(classification) {
    this.setState({classification:classification})
  }

  render() {
    return (
      <div className="App">
        Upload an image
        <ImageUploader setFileState={this.setFileState.bind(this)} />
        <Classifier setClassificationState={this.setClassificationState.bind(this)}
          file={this.state.file} classification={this.state.classification}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
