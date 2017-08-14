import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class NavTab extends React.Component {
  static get propTypes() {
    return {
      to: PropTypes.string,
      children: PropTypes.string,
    }
  }

  render() {
      let isActive = this.context.router.route.location.pathname === this.props.to;
      let className = isActive ? "active" : "";

      return (
        <li className={className}>
          <Link {...this.props}>
              {this.props.children}
          </Link>
        </li>
      );
  }
}

NavTab.contextTypes = {
    router: PropTypes.object
};

export default NavTab;

