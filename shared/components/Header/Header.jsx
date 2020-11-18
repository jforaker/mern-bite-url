import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/">MERN bite url</Link>
          </h1>
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func,
  handleLogoClick: PropTypes.func,
};
