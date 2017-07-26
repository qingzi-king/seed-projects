import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import _ from 'lodash';

import { Button, Spin, Anchor, Affix } from 'antd';
const AnchorLink = Anchor.Link;

import styles from './IndexPage.less';

import Demo from './Demo';

const Users = ({ location, dispatch, users, apps, loading }) => {

  let onChangeChildren = (value) => {
    console.log(value)
  };

class Test1 extends Component {
  render() {
    return (
      <div>呵呵呵{users.name}</div>
    )
  }
}

  return (
    <div style={{width:1024,margin:'10px auto'}}>
      姓名：{users.name}
      <Test1 />
      <Test onOk={onChangeChildren} name={users.name} />
      <Demo />
    </div>
  );
}

// 子组件
class Test extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false; // false本组件将拒绝再次render
  }

  handleToFather() {
    const { onOk } = this.props; // 其实onOk就是一个回调函数
    onOk('你好父组件....');
  }

  render() {
    console.log(this.props.name)
    console.log('render....')
    return (
      <div>
        <div>
          哈哈哈哈哈
          <a onClick={this.handleToFather}>点击</a>
        </div>
      </div>
    );
  }
}

// Users.propTypes = {
//   users: PropTypes.object,
//   apps: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func
// }

function mapStateToProps(state) {
  return {
    users: state.users,
    apps: state.apps,
    loading: state.loading.models.users
  };
}

export default connect(mapStateToProps)(Users)
