import React, { Component } from "react";
import { NavItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-pf" role="navigation">
        <div className="navbar-header" >
          <Link className="navbar-brand" to="/">
            <img alt="RecognEyes"/>
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-primary">
          <IndexLinkContainer to="/" activeHref="active">
            <NavItem>Image Classification</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/stats" activeHref="active">
            <NavItem>Statistics</NavItem>
          </LinkContainer>
          <LinkContainer to="/config" activeHref="active">
            <NavItem>Configutation</NavItem>
          </LinkContainer>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
