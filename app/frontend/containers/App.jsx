import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from '../components/NavBar.jsx'
import Message from '../components/Message.jsx'
import ImageClassifierView from './ImageClassifierView.jsx'
import ConfigView from './ConfigView.jsx'
import StatsView from './StatsView.jsx'


import { clearMessage } from '../actions/messageActions'

class App extends Component {

  render() {
    return (
        <Router>
          <div className="app">
            <Navbar/>
            <Message message={this.props.message} messageType={this.props.messageType}
              icon={this.props.icon} visible={this.props.visible}
              clearMessage={this.props.clearMessage}/>
            <Switch>
               <Route exact path="/" component={ImageClassifierView}/>
            </Switch>
            <Switch>
               <Route exact path="/stats" component={StatsView}/>
            </Switch>
            <Switch>
               <Route exact path="/config" component={ConfigView}/>
            </Switch>
          </div>
        </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    messageType: state.messageReducer.messageType,
    icon: state.messageReducer.icon,
    visible: state.messageReducer.visible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      clearMessage: () => {
          dispatch(clearMessage())
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
