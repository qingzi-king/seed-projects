import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { hashHistory, browserHistory } from 'react-router';
import Routes from '../routes/index.jsx';

ReactDOM.render(<Routes history={hashHistory}/>, document.getElementById('root'));