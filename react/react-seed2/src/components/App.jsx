import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/demo">Demo路径</Link>
      </div>
    );
  }
}

export default App;
