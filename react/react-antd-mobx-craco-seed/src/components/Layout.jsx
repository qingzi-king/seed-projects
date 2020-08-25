/**
 * 全局框架组件 - 高阶组件封装
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderUnit from './Header';

import './Common.less';
const { Header, Content } = Layout;

const LayoutUnit = (WrappedComponent, options) => {

  return class HOC extends Component {
    render() {
      return (
        <Layout className="d-layout">
          <Header className="d-layout-header-container">
            <HeaderUnit />
          </Header>
          <Content className="d-layout-body-container">
            <div className="d-content-container">
              {/* 内容体 */
                WrappedComponent && <WrappedComponent {...this.props} />
              }
            </div>
          </Content>
        </Layout>
      )
    }
  }
}

export default LayoutUnit;