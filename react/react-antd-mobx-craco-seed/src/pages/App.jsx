/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-07-24 14:31:16
 */
import React, { Component, Fragment } from 'react';

import LayoutHOC from '../components/Layout';
import './common/Common.less';

const App = () => (
  <div className="d-error">
    <div className="d-error-500-icon"></div>
    <div className="d-error-content">
      <div className="d-error-code">{ global.G_SYSTEM_TITLE.welcome.name }</div>
      <div className="d-error-desc">{ global.G_SYSTEM_TITLE.welcome.subName }</div>
    </div>
  </div>
);

export default LayoutHOC(App);