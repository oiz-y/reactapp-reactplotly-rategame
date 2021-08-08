import React from "react";
import './MainResult.css'

const Result = () => {
  return (
    <div className="result">
      It seems to be doing well these days. It will continue to grow.
    </div>
  );
}

class MainResult extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAnalysis && this.props.isDraw ? <Result /> : ""}
      </div>
    );
  }
}

export default MainResult;
