/**
 * 头部公共组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Tooltip, Popover } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import './Common.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  componentDidMount() {
  }
  handleVisibleChange = () => {
    this.setState({ visible: !this.state.visible });
  }
  handleRedirect = () => {
    this.props.history.push('');
  }
  render() {
    const state = this.state;
    const userNavigationCustom = (
      <div className="d-navigation-custom-avatar">
        <ul className="d-navigation-menu">
          <li className="d-navigation-menu-item">退出登录</li>
        </ul>
      </div>
    );

    let realKeys = global.G_SPLIT_URL_PARAMS();
    let defaultSelectedKeys = realKeys[0];

    return (
      <div className="d-header">
        <div className="d-header-left">
          <div className="d-logo">
            <img src="http://docs.antjob.ink/funenc/funenc-logo.jpg" alt="logo" />
          </div>
          <div className="d-header-title">{ global.G_SYSTEM_TITLE.name }</div>
          <div className="d-header-company">{ global.G_SYSTEM_TITLE.subName }</div>
        </div>
        <div className="d-header-right">
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedKeys}
            className="d-header-nav"
          >
            <Menu.Item key="board">
              <Link to="/board">看板</Link>
            </Menu.Item>
            <Menu.Item key="plan">
              <Link to="/plan">计划管理</Link>
            </Menu.Item>
            <Menu.Item key="report">
              <Link to="/report">工作报告</Link>
            </Menu.Item>
            <Menu.Item key="console">
              <Link to="/console">控制台</Link>
            </Menu.Item>
          </Menu>
          <div className="d-project">
            交控MAAS项目
            <Tooltip placement="bottom" title="切换项目">
              <RetweetOutlined className="d-header-icon" />
            </Tooltip>
          </div>
          <div className="d-avatar">
            <Popover
              content={userNavigationCustom}
              title=""
              trigger="hover"
              visible={state.visible}
              onVisibleChange={this.handleVisibleChange}
              placement="bottomRight"
            >
              <img src="https://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDmibhjC2qqJsFibbRhEwic0xCtj4LdP6MT4dtWPRTTpRWM0QibY8zHZIhFg/0" alt="avatar" />
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;