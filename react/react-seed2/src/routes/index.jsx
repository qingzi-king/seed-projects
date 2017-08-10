import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import App from '../components/App';
import Demo from '../components/Demo';

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ App }/>
        <Route exact path='/demo' component={ Demo }/>
      </Switch>
    </BrowserRouter>
  )

Routes.propTypes = {
  text: PropTypes.any
};

export default Routes;