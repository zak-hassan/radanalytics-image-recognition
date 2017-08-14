import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import NavTab from "./NavTab.jsx";

class Navbar extends Component {

  static get propTypes() {
    return {
      activeRoute: PropTypes.string,
      setRoute: PropTypes.func
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-pf" role="navigation">
        <div className="navbar-header" >
          <Link className="navbar-brand" to="/">
            <img alt="RecognEyes"/>
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-primary">
          <NavTab to="/" activeRoute={this.props.activeRoute}
            setRoute={this.props.setRoute}> Image Classification
          </NavTab>
          <NavTab to="/stats" activeRoute={this.props.activeRoute}
            setRoute={this.props.setRoute}> Statistics
          </NavTab>
          <NavTab to="/config" activeRoute={this.props.activeRoute}
            setRoute={this.props.setRoute}>Configuration
          </NavTab>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
