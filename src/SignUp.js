import React from 'react';
import { Link } from 'react-router-dom';
// import './SignUp.css';

class SignUp extends React.Component {
  render() {
    return (
      <div className="login">
        <h1>Sign Up</h1>
        <div>
          <label className="label">User Name</label>
          <input type="text"></input>
        </div>
        <div>
          <label className="label">E mail</label>
          <input type="text"></input>
        </div>
        <div>
          <label className="label">Password</label>
          <input type="text"></input>
        </div>
        <button className="afterInputLoginButton">Sign Up</button>
        <Link to="/SignIn">
          Sign In
        </Link>
      </div>
    );
  }
}

export default SignUp;
