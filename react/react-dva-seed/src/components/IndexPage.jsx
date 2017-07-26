import React, {Component, PropTypes} from 'react';
import { Router, Route, Link } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';

import { Button } from 'antd';

import styles from './IndexPage.less';

//main
class IndexPage extends React.Component {

  //检查props属性类型，拥有多种类型（array/bool/func/element/node/number/object/string/symbol）
  static propTypes = {
    onChange: PropTypes.func
  };

  //初始化state
  state = {
    times: moment().format('YYYY-MM-DD hh:mm:ss')
  };

  componentDidMount() {
    this.setTimesBySecond();
  };

  componentWillUnmount() {
    //卸载定时器interval
    clearInterval(this.interval)
  };

  setTimesBySecond() {
    let _self = this;

    this.interval = setInterval(() => {
      _self.setState({
        times: moment().format('YYYY-MM-DD hh:mm:ss')
      });
    }, 1000)
    
  };

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>Yay! Welcome to carkings dva!!!</div>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>你好，重庆！</li>
          <li>{this.state.times}</li>
          <li>
            <Link to="/demo"><Button type="primary">Demo</Button></Link>
          </li>
          <li>
            <Link to="/test"><Button type="primary">测试</Button></Link>
          </li>
          <li>
            <Link to="/demoOrgin"><Button type="primary">原始组件Demo</Button></Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect()(IndexPage);
