import React, { Component } from 'react';
import { Table, Button, Tag } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { getModularAuths } from '../../../services/api';

import DrawerUnit from '../../../components/Drawer';

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      columns: [],
      subModalComponent: null,
      subModalTitle: null,
    }
  }
  componentDidMount() {
    this.handleGetModularAuths();
  }
  handleGetModularAuths = async () => {
    this.setState({ loading: true });

    let res = await getModularAuths();

    let columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        render: (text, record, index) => {
          return index + 1;
        }
      },
      {
        title: '类型',
        width: 100,
        dataIndex: 'type',
      },
      {
        title: '编码',
        dataIndex: 'code',
        width: 150,
        render: (text, record) => {
          return text || '/';
        }
      },
      {
        title: '录入时间',
        dataIndex: 'createdAt',
        width: 100,
        render: (text, record) => {
          return global.G_DATE_FORMAT(text);
        }
      },
      {
        title: '权限拥有者',
        dataIndex: 'owner',
        render: (text, record) => {
          if (record.AuthModularItems.length > 0) {
            return (
              <div>
                {
                  record.AuthModularItems.map((auth) => {
                    if (auth.User) {
                      return <Tag key={auth.id} style={{marginTop:2,marginBottom:2}}>{auth.User.name}</Tag>
                    } else {
                      return <Tag key={auth.id} icon={<TeamOutlined />} style={{marginTop:2,marginBottom:2}}>{auth.StandardRole.name}</Tag>
                    }
                  })
                }
              </div>
            )
          } else {
            return '/';
          }
        }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        render: (text, record) => {
          return <div style={{minWidth:100}}>{text || '/'}</div>;
        }
      },
      {
        title: '操作',
        dataIndex: 'options',
        width: 100,
        render: (text, record) => {
          return (
            <>
              <Button size="small" type="link" danger>修改</Button>
            </>
          )
        }
      }
    ];

    this.setState({
      columns,
      dataSource: res.modularAuths,
      visible: false,
      loading: false
    });
  }
  handleVisibleDrawer = (type, record) => {
    let subModalComponent, subModalTitle;
    let { visible } = this.state;

    switch (type) {
      case 'cancel':
      break;
      default:
      break;
    }

    this.setState({
      visible: !visible,
      subModalTitle,
      subModalComponent
    });
  }
  render() {
    const state = this.state;
    return (
      <div>
        <div style={{marginBottom:15}}>
          <Button type="primary" onClick={this.handleVisibleDrawer.bind(this, 'createProject')}>新增授权</Button>
          <small className="d-text-gray">（当前共有授权模块{state.dataSource.length}个）</small>
        </div>
        <Table
          className="d-table-center-container"
          dataSource={state.dataSource}
          columns={state.columns}
          loading={state.loading}
          rowKey={record => record.id}
          bordered
          pagination={{ pageSize: 20 }}
        />
        <DrawerUnit
          title={state.subModalTitle}
          isVisible={state.visible}
          callbackParent={this.handleVisibleDrawer}
        >
          { state.subModalComponent }
        </DrawerUnit>
      </div>
    );
  }
}

export default ProjectPage;