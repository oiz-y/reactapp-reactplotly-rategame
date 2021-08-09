import React from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="title">
      <div className="titleInner">
        <span>Let's Play the Rate Game!!</span>
        <Link to="/SignIn">
          <button className="loginButton">SignIn</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
