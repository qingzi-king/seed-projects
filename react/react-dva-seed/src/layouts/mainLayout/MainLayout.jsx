import React, {Component, PropTypes} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import moment from 'moment';
import _ from 'lodash';

import { Button, Spin } from 'antd';

import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>Header...</div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;