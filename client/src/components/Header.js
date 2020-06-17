import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Checking in backend";
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li>
            <Payments />
          </li>,

          <li>
            <a href="/auth/logout">Log out</a>
          </li>,
        ];
    }
  }

  logoLink() {
    return this.props.auth ? "/surveys" : "/";
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.logoLink()} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
