import React, {Component, PropTypes} from 'react';
import { Router, Route, Link } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';

import { Button } from 'antd';

import styles from './Common.less';

//main
class SubUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmitToFather = () => {
    const { onOk } = this.props; // 其实onOk就是一个回调函数
    onOk('你好父组件....');
  }

  render() {
    return (
      <div style={{marginTop:50}}>
        SubUsers组件 哈哈哈...
        <Button size="small" type="primary" onClick={this.handleSubmitToFather}>子组件向父组件提交数据</Button>
      </div>
    );
  }
}

export default connect()(SubUsers);