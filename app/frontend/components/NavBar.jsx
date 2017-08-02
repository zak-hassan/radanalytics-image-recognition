import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-pf" role="navigation">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img alt="Image Classifier"/>
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-primary">
          <li>
            <Link to="/">Image Classification</Link>
          </li>
          <li>
            <Link to="/stats">Statistics</Link>
          </li>
          <li>
            <Link to="/config">Configuration</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
