import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

class SignIn extends React.Component {
  render() {
    return (
      <div className="login">
        <h1>Sign In</h1>
        <div>
          <label className="label">User Name</label>
          <input type="text"></input>
        </div>
        <div>
          <label className="label">Password</label>
          <input type="text"></input>
        </div>
        <button className="afterInputLoginButton">Sign In</button>
        <Link to="/SignUp">
          Sign Up
        </Link>
      </div>
    );
  }
}

export default SignIn;
