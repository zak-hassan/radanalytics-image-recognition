import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ImageUploader from './Components/ImageUploader.jsx'
import Classifier from './Components/Classifier.jsx'
import Navbar from './Components/NavBar.jsx'
import Message from './Components/Message.jsx'

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      file:null,
      classification:null,
      message:null,
      visible:null
    }
  }

  setFileState(fileUpload) {
    this.setState({file:fileUpload})
  }

  setClassificationState(classification) {
    this.setState({classification:classification})
  }

  setMessage(msg, type) {
    this.setState({visible:true})
    this.setState({message:[msg, type]})
  }

  setMessageVisible(visible) {
    this.setState({visible:visible})
  }

  render() {
    return (
        <div className="app">
          <Navbar/>
            <Message msg={this.state.message} visible={this.state.visible} setVis={this.setMessageVisible.bind(this)}/>
            <div className="container-fluid container-cards-pf">
              <div className="col col-cards-pf">
                <div className="cards col-xs-10 col-md-8 ">
                  <ImageUploader setFileState={this.setFileState.bind(this)} />
                  <Classifier setClassificationState={this.setClassificationState.bind(this)}
                    file={this.state.file} classification={this.state.classification} setMessage={this.setMessage.bind(this)}
                      message={this.state.message} setVis={this.setMessageVisible.bind(this)}/>
                </div>
              </div>
            </div>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
