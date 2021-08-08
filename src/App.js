import React from "react";
import Home from './Home.js';
import Introduction from './Introduction.js';
import AboutFields from "./AboutFields.js";
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/Introduction" exact component={Introduction} />
            <Route path="/AboutFields" exact component={AboutFields} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
