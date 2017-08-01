import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from './NavBar.jsx'
import Message from '../containers/Message.jsx'
import ImageClassifierView from '../containers/ImageClassifierView.jsx'

class App extends Component {

  render() {
    return (
        <Router>
          <div className="app">
            <Navbar/>
            <Message/>
            <Switch>
               <Route path="/" exact component={ImageClassifierView}/>
            </Switch>
          </div>
        </Router>
    )
  }
}
export default App
