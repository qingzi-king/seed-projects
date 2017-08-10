import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import './Demo.less';

class Demo extends Component {
  render() {
    return (
      <center>
        <div>
          <h2 className="c-title">Welcome to React Demo...</h2>
        </div>
        <Link to="/">主页</Link>
      </center>
    );
  }
}

export default Demo;
