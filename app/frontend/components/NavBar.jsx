import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-pf" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img alt="Image Classifier" />
          </a>
        </div>
      </nav>
    )
  }
}

export default Navbar
