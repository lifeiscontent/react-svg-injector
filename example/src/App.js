import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as lib from "react-svg-injector";

console.log(lib);

function randomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: randomHexColor()
  };
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ color: randomHexColor() });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReactSvgInjector src={logo} className="App-logo" alt="logo">
            <Mutate
              selector="g"
              fill={this.state.color}
              onClick={this.onClick}
            />
          </ReactSvgInjector>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
