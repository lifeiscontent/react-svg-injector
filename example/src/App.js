import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ReactSVGInjector, Mutate } from 'react-svg-injector';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReactSVGInjector src={logo} className="App-logo" alt="logo">
            <Mutate selector="g" fill="#BADA55" />
          </ReactSVGInjector>
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
