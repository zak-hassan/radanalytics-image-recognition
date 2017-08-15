import React, { Component } from "react";
import { NavItem, Navbar, Nav } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {

  render() {
    return (
      <Navbar className="navbar-default navbar-pf">
        <Navbar.Header>
          <Navbar.Toggle/>
          <Link className="navbar-brand" to="/">
            <img alt="RecognEyes"/>
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="navbar-primary navbar-nav">
            <IndexLinkContainer to="/" activeHref="active">
              <NavItem>Image Classification</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/stats" activeHref="active">
              <NavItem>Statistics</NavItem>
            </LinkContainer>
            <LinkContainer to="/config" activeHref="active">
              <NavItem>Configutation</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
