import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

class Account extends React.Component {
  render() {
    return (
      <div>
        <Link to="SignIn" className="SignLink">Sign In</Link>
        <Link to="SignUp" className="SignLink">Sign Up</Link>
      </div>
    );
  }
}

export default Account;
