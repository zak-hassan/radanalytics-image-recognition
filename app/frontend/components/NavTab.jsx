import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class NavTab extends React.Component {

  static get propTypes() {
    return {
      to: PropTypes.string,
      activeRoute: PropTypes.string,
      children: PropTypes.string,
      setRoute: PropTypes.func
    }
  }

  render() {
      var isActive = this.props.activeRoute === this.props.to;
      var className = isActive ? "active" : "";

      return (
        <li className={className} onClick={() => this.props.setRoute(this.props.to)}>
          <Link to={this.props.to}>
              {this.props.children}
          </Link>
        </li>
      );
  }
}

export default NavTab;

