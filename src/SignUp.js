import React from 'react';
import { Link } from 'react-router-dom';
import 'cross-fetch/polyfill';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { useHistory } from "react-router-dom";
import { poolData } from './Param.js';
// import './SignUp.css';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      eMail: '',
      password: '',
      authCode: '',
      isRegistered: false
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
    console.log('STATE', this.state);
    const attributeList = [];
    const eMails = {
      Name: 'email',
      Value: this.state.eMail
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(eMails);
    attributeList.push(attributeEmail);

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const self = this;
    userPool.signUp(this.state.userName, this.state.password, attributeList, null, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      const cognitoUser = result.user;
      console.log('Hi!' + cognitoUser.getUsername());
      self.setState({isRegistered: true});
    });
  }

  submitAuthCode(e) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username: this.state.userName,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    const self = this;
    cognitoUser.confirmRegistration(this.state.authCode, true, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Your Email is CONFIRMED');
      self.handleClick();
    });
  }

  render() {
    return (
      <div className="login">
        {!this.state.isRegistered ?
          <div>
            <h1>Sign Up</h1>
            <div>
              <label className="label">User Name</label>
              <input type="text" onChange={(e, key) => this.changeHandler(e, "userName")} />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="text" onChange={(e, key) => this.changeHandler(e, "eMail")} />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="text" onChange={(e, key) => this.changeHandler(e, "password")} />
            </div>
            <button className="afterInputLoginButton"
              onClick={() => this.submitUserDate()}>Sign Up</button>
            <Link to="/SignIn">
              Sign In
            </Link>
          </div>
          :
          <div>
            <div>
              <label className="label">Auth Code</label>
              <input type="text" onChange={(e, key) => this.changeHandler(e, "authCode")} />
            </div>
            <button className="authCodeButton"
              onClick={() => this.submitAuthCode()}>
              submit
            </button>
          </div>
        }
      </div>
    );
  }
}
