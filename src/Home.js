import React, { useLayoutEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import createPlotlyComponent from 'react-plotly.js/factory';
import {
  lineTemplate,
  circleTemplate,
  black,
  skyBlue,
  scarlet,
  pointsLength,
  markerSize,
  url,
  requestOptions
} from './Param.js';
import Welcome from './Welcome.js';
import MainResult from './MainResult.js';
import Fields from './Fields.js';
import RecentResult from './RecentResult.js'
import './App.css';
import "./Home.css";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineGraph: {},
      x: [],
      y: [],
      color: [],
      text: [],
      hovertemplate: circleTemplate,
      title: null,
      isAnalysis: false,
      isDraw: false,
      isChecked: false,
      recentList: [],
      recentGraphList: [],
      width: 700,
      height: 450
    };
  }

  clickPoint(e) {
    const pointIndex = e.points[0].pointIndex;
    const xaxis = e.points[0].data.x[pointIndex];
    const yaxis = e.points[0].data.y[pointIndex];
    const x = this.state.x;
    const y = this.state.y;
    const color = this.state.color;

    if (this.state.x.indexOf(xaxis) === -1) {
      x.push(xaxis);
      x.sort((a, b) => a - b);
      const insertIndex = x.indexOf(xaxis);
      y.splice(insertIndex, 0, yaxis);
      color.push(skyBlue);
    } else {
      const index = x.indexOf(xaxis);
      x.splice(index, 1);
      y.splice(index, 1);
      color.splice(index, 1);
    }

    const colorLastChanged = color;
    colorLastChanged[colorLastChanged.length - 1] = skyBlue;
    const graphList = this.state.recentGraphList;
    console.log(color, colorLastChanged)
    graphList[graphList.length - 1] = {
      lineGraph: this.state.lineGraph,
      circleGraph: {
        mode: "markers",
        x: this.state.x,
        y: this.state.y,
        marker: {
          color: colorLastChanged,
          size: markerSize,
          opacity: 0.5
        },
        hovertemplate: this.state.hovertemplate
      },
      layout: { title: this.state.title }
    }

    this.setState({
      x: [...x],
      y: [...y],
      color: color,
      recentGraphList: [...graphList],
    });
  }

  hoverPoint(e, beforeColor, afterColor) {
    if (e.points[0].data.mode === "lines") {
      return;
    }
    const x = this.state.x;
    const pointIndex = e.points[0].pointIndex;
    const xaxis = e.points[0].data.x[pointIndex];
    const index = x.indexOf(xaxis);
    const color = this.state.color;
    if (color[index] === beforeColor) {
      color[index] = afterColor;
      this.setState({ color: [...color] });
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  drawChart() {
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    if (!this.state.title) {
      return;
    }
    const lineGraph = {
      x: [],
      y: [],
      mode: "lines",
      marker: {
        color: black
      },
      text: new Array(pointsLength).fill("Click Here!"),
      hovertemplate: lineTemplate,
    };

    for (let i = 0; i < pointsLength; i++) {
      lineGraph.x.push(i + 1);
      let yValue;
      if (i === 0) {
        yValue = this.getRandomArbitrary(0, 10000);
      } else {
        yValue = this.getRandomArbitrary(
          lineGraph.y[lineGraph.y.length - 1] - 100,
          lineGraph.y[lineGraph.y.length - 1] + 100
        );
      }
      lineGraph.y.push(yValue);
    }

    const list = this.state.recentList;
    if (list.length > 10) {
      list.splice(0, 1);
    }
    list.push(this.state.title.split(' ')[0]);

    const graphList = this.state.recentGraphList;
    if (graphList.length > 10) {
      graphList.splice(0, 1);
    }
    graphList.push(
      {
        lineGraph: lineGraph,
        circleGraph: {
          mode: "markers",
          x: this.state.x,
          y: this.state.y,
          marker: {
            color: this.state.color,
            size: markerSize,
            opacity: 0.5
          },
          hovertemplate: this.state.hovertemplate
        },
        layout: { title: this.state.title }
      }
    )

    this.setState({
      lineGraph: lineGraph,
      isAnalysis: false,
      isDraw: true,
      recentList: [...list],
      recentGraphList: [...graphList],
    });
  }

  changeMenu(title) {
    this.setState({
      title: title + ' Rate',
      lineGraph: {},
      x: [],
      y: [],
      color: [],
      text: [],
    });
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth / 1.6,
      height: window.innerHeight / 2
    });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  // }

  render() {
    return (
      <div className="App">
        <Welcome />
        <Container className="MainContainer">
          <Row>
            <Col xs={2}>
              <Fields changeMenu={this.changeMenu.bind(this)} />
            </Col>
            <Col xs={8} className="Chart">
              <Plot
                data={[
                  this.state.lineGraph,
                  {
                    mode: "markers",
                    x: this.state.x,
                    y: this.state.y,
                    marker: {
                      color: this.state.color,
                      size: markerSize,
                      opacity: 0.5
                    },
                    hovertemplate: this.state.hovertemplate
                  }
                ]}
                layout={
                  {
                    title: this.state.title,
                    width: this.state.width,
                    height: this.state.height
                  }
                }
                onClick={(e) => this.clickPoint(e)}
                onHover={(e) => this.hoverPoint(e, skyBlue, scarlet)}
                onUnhover={(e) => this.hoverPoint(e, scarlet, skyBlue)} />
            </Col>
            <Col xs={2} className="RecentResultCol">
              <RecentResult
                list={this.state.recentList}
                graphList={this.state.recentGraphList}
              />
            </Col>
          </Row>
        </Container>
        <div>
          <a className="playButton"
            onClick={() => this.drawChart()}>Play</a>
          <a className="analysisButton"
            onClick={() => this.setState({ isAnalysis: true })}>Analysis</a>
        </div>
        <MainResult isDraw={this.state.isDraw} isAnalysis={this.state.isAnalysis} />
        <Link to="/Introduction" className="IntroLink">
          Introduction
        </Link>
        <Link to="/AboutFields" className="FieldsLink">
          About Fields
        </Link>
        <Link to="/Account" className="FieldsLink">
          Account
        </Link>
      </div>
    );
  }
}

export default Home;
