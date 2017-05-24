import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';

let AppContainer = React.createClass({
	contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    return (
      <MainLayout>
        <center style={{ marginTop: '20%' }}>
          <h1>Hello Carkings！</h1>
          <h3>React seed 1.x</h3>
        </center>
      </MainLayout>
    );
  }
});

export default AppContainer;