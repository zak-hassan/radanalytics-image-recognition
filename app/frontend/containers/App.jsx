import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import ImageUploader from './ImageUploader.jsx'
import Classifier from './Classifier.jsx'
import Navbar from '../components/NavBar.jsx'
import Message from './Message.jsx'

import { setView } from '../actions/viewActions'

class App extends Component {

  render() {
    return (
        <div className="app">
          <Navbar/>
          <Message/>
            <div className="container-fluid container-cards-pf">
              <div className="col col-cards-pf">
                <div className="cards col-xs-10 col-md-8 ">
                  <ImageUploader/>
                  <Classifier/>
                </div>
              </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    view: state.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => {
      dispatch(setView(view))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
