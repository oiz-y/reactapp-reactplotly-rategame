import React from 'react';
import { Link, useHistor, } from 'react-router-dom';
import 'cross-fetch/polyfill';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { poolData } from './Param.js';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }

  changeHandler(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleClick() {
    this.props.history.push("/");
  };

  submitUserDate() {
    const authenticationData = {
      Username: this.state.userName,
      Password: this.state.password
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username : this.state.userName,
      Pool : userPool
    };
    const self = this;
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const idToken = result.getIdToken().getJwtToken();
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        console.log('Sign In is success!');
        self.handleClick();
      },
      onFailure: function(err) {
          console.log(err);
      },
    });
  }

  render() {
    return (
      <div className="login">
        <h1>Sign In</h1>
        <div>
          <label className="label">User Name</label>
          <input type="text" onChange={(e, key) => this.changeHandler(e, "userName")}></input>
        </div>
        <div>
          <label className="label">Password</label>
          <input type="text" onChange={(e, key) => this.changeHandler(e, "password")}></input>
        </div>
        <button className="afterInputLoginButton"
          onClick={() => this.submitUserDate()}>Sign In</button>
        <Link to="/SignUp">
          Sign Up
        </Link>
      </div>
    );
  }
}

export default SignIn;
