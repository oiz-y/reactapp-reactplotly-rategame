import React from 'react';
import technology from './images/technology.jpg'
import './Introduction.css';

class Introduction extends React.Component {
  render() {
    return (
      <div className="introduction">
        <img src={technology} alt="this" width="800" height="600" className="TechnologyImage"></img>
        <p className="intro">We are developing an application to analyze recent rates accurately, quickly, and flexibly.<br></br>
        This application is very useful to keep abreast of the modern trends and to predict the trend of the times.
        Come and analyze the rates with us!</p>
      </div>
    );
  }
}

export default Introduction;
