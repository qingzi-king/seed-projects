import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

import './globalFunction'; //全局方法

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>

      <div className={styles.main}>
        {children}
      </div>

    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainLayout;