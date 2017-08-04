import React, { Component } from "react"
import { Link } from "react-router-dom"

import NavTab from "./NavTab.jsx"

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
          <NavTab to="/">Image Classification</NavTab>
          <NavTab to="/stats">Statistics</NavTab>
          <NavTab to="/config">Configuration</NavTab>
        </ul>
      </nav>
    )
  }
}

export default Navbar
