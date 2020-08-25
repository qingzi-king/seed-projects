import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { getProjects } from '../../../services/api';

import DrawerUnit from '../../../components/Drawer';
import CreateProjectUnit from './Create';
import ModifyProjectUnit from './Modify';
import SetPersonUnit from './SetPerson';

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
    this.handleGetProjects();
  }
  handleGetProjects = async () => {
    this.setState({ loading: true });

    let res = await getProjects();

    let columns = [
      {
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => {
          return index + 1;
        }
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (text, record) => {
          return text || '/';
        }
      },
      {
        title: '阶段',
        dataIndex: 'stage',
        render: (text, record) => {
          return text || '/';
        }
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        render: (text, record) => {
          return global.G_DATE_FORMAT(text);
        }
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        render: (text, record) => {
          return global.G_DATE_FORMAT(text);
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => {
          let resStatue = global.G_ENUM.projectStatus.find(o => o.value === text);
          return resStatue ? resStatue.label : '/';
        }
      },
      {
        title: '创建人',
        dataIndex: 'owner',
        render: (text, record) => {
          return record.Owner.name || '/';
        }
      },
      {
        title: '操作',
        dataIndex: 'options',
        render: (text, record) => {
          return (
            <>
              <Button size="small" type="link" danger onClick={this.handleVisibleDrawer.bind(this, 'modifyProject', record)}>修改</Button>
              <Button size="small" type="link" danger onClick={this.handleVisibleDrawer.bind(this, 'setPerson', record)}>成员设置</Button>
            </>
          )
        }
      }
    ];

    this.setState({
      columns,
      dataSource: res.projects,
      visible: false,
      loading: false
    });
  }
  handleVisibleDrawer = (type, record) => {
    let subModalComponent, subModalTitle;
    let { visible } = this.state;

    switch (type) {
      case 'createProject':
        subModalTitle = '新建项目';
        subModalComponent = <CreateProjectUnit onclose={this.handleVisibleDrawer} callbackParent={this.handleGetProjects} />;
      break;
      case 'modifyProject':
        subModalTitle = '更新项目';
        subModalComponent = <ModifyProjectUnit project={record} onclose={this.handleVisibleDrawer} callbackParent={this.handleGetProjects} />;
      break;
      case 'setPerson':
        subModalTitle = '设置项目成员';
        subModalComponent = <SetPersonUnit project={record} onclose={this.handleVisibleDrawer} callbackParent={this.handleGetProjects} />;
      break;
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
          <Button type="primary" onClick={this.handleVisibleDrawer.bind(this, 'createProject')}>新建项目</Button>
          <small className="d-text-gray">（当前共有项目{state.dataSource.length}个）</small>
        </div>
        <Table
          className="d-table-center-container"
          dataSource={state.dataSource}
          columns={state.columns}
          loading={state.loading}
          rowKey={record => record.uuid}
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