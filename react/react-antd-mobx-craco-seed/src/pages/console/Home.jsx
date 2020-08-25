import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';

import LayoutHOC from '../../components/Layout';
import ProjectPage from './project/Home';
import RolePage from './role/Home';
import AuthorizationPage from './authorization/Home';
import WarningUnit from '../common/Warning';

import './Common.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
  }
  handleMenu = (e) => {
    const { key } = e;

    this.props.history.push(`/console/${key}`);

  }
  render() {

    let realKeys = global.G_SPLIT_URL_PARAMS();
    let defaultSelectedKey = realKeys[1] || '无';

    let subComponent;

    switch(defaultSelectedKey) {
      case 'project':
        subComponent = <ProjectPage />
      break;
      case 'role':
        subComponent = <RolePage />
      break;
      case 'authorization':
        subComponent = <AuthorizationPage />
      break;
      default:
        subComponent = <WarningUnit type="selectMenu" />
      break;
    }

    return (
      <Fragment>
        <div className="d-left-container">
          <Menu
            onClick={this.handleMenu}
            selectedKeys={defaultSelectedKey}
            mode="inline"
          >
            <Menu.Item key="project">
              项目管理
            </Menu.Item>
            <Menu.Item key="role">
              角色管理
            </Menu.Item>
            <Menu.Item key="authorization">
              授权管理
            </Menu.Item>
          </Menu>
        </div>
        <div className="d-right-container">
          { subComponent }
        </div>
      </Fragment>
    );
  }
}

export default LayoutHOC(Home);