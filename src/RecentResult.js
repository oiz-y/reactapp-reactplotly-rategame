import React from 'react';
import './RecentResult.css'
import { Modal, Button } from "react-bootstrap";
import createPlotlyComponent from 'react-plotly.js/factory';

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class RecentResult extends React.Component {
  createList(list) {
    const listElement = [];
    for (let i = 0; i < list.length; i++) {
      listElement.push(
        <li key={i}>
          <GraphData
            field={list[list.length - (i + 1)]}
            graph={this.props.graphList[list.length - (i + 1)]}
          />
        </li>
      );
    }
    return (
      <ul className="List">
        {listElement}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div>
          <p className="RecentResult">Recent Results</p>
          {this.createList(this.props.list)}
        </div>
      </div>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Recent Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Plot
          data={[
            props.graph.lineGraph, props.graph.circleGraph
          ]}
          layout={props.graph.layout}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function GraphData(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <a className="RecentResultElem" variant="primary" onClick={() => setModalShow(true)}>
        {props.field}
      </a>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        graph={props.graph}
      />
    </>
  );
}

export default RecentResult;
