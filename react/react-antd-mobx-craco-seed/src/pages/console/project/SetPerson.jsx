import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Select, message, Popover, Modal } from 'antd';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getUsers,
  getProject,
  setProjectPerson,
  getStandardRoles,
  changeProjectUser,
  deleteProjectUser
} from '../../../services/api';
import './Common.less';

const { Option } = Select;

/**
* 设置项目成员组件
*/
const SetPersonUnit = (props) => {

  // 状态控制
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [standardRoles, setStandardRoles] = useState([]);

  useEffect(() => {
    handleGetStandardRoles();
    handleGetProject();
  }, []);

  // 取消表单
  const onCancel = values => {
    props.onclose('cancel');
  };

  // 获取标准角色
  const handleGetStandardRoles = async () => {
    let res = await getStandardRoles();
    setStandardRoles(res.standardRoles);
  }

  // 获取项目详情
  const handleGetProject = async () => {
    let res = await getProject(props.project.uuid);
    setUsers(res.project.Users);
    setLoading(false);
  }

  // 选中人员
  const handleSelectedUserRole = async (user) => {
    setSelectedUser(user);
  }

  // 选中角色
  const handleSelectedRole = async (user, role, hasRole) => {

    let type = hasRole ? 'delete' : 'create';

    if (type === 'delete' && user.roles.length < 2) {
      return message.warning('至少应存在一个有效角色！', 1);
    }

    handleUserRole({ type, roleCode: role.code });

  }

  // 处理人员角色
  const handleUserRole = async (datas) => {
    let res = await changeProjectUser(props.project.uuid, selectedUser.uuid, datas);
    if (res.errcode >= 0) {
      handleGetProject();
    }
  }

  // 删除项目指定人员
  const handleDeleteProjectUser = (user) => {
    Modal.confirm({
      title: `确定要将「${user.name}」移除本项目吗?`,
      icon: <ExclamationCircleOutlined />,
      content: '移除后可再次加入本项目',
      okType: 'danger',
      onOk: async () => {
        let res = await deleteProjectUser(props.project.uuid, user.uuid);
        if (res.errcode >= 0) {
          message.success('移除成功！', 1);
          handleGetProject();
        }
      },
      onCancel() {
      },
    });
  }

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
      title: '姓名',
      dataIndex: 'name',
      width: 80,
      render: (text, record, index) => {
        return text || '/';
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 100,
      render: (text, record, index) => {
        return text || '/';
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render: (text, record, index) => {
        return text || '/';
      }
    },
    {
      title: '所属角色',
      dataIndex: 'role',
      render: (text, record, index) => {
        let roleStr = record.roles.map(o => o.name).join('、');
        let roleCodes = record.roles.map(o => o.code);
        const content = (
          <div className="d-dropdown-menu-container">
            <ul>
              {
                standardRoles.map((role) => {
                  let hasRole = roleCodes.includes(role.code);
                  return (
                    <li key={role.id} onClick={() => handleSelectedRole(record, role, hasRole)}>
                      { hasRole &&  <CheckOutlined className="d-dropdown-icon" />}
                      { role.name }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        );
        return (
          <Popover placement="bottom" content={content} trigger="click">
            <div className="d-link" onClick={() => handleSelectedUserRole(record)}>{roleStr || '/'}</div>
          </Popover>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'options',
      render: (text, record, index) => {
        return <Button type="link" danger onClick={() => handleDeleteProjectUser(record)}>移除</Button>
      }
    },
  ];

  return (
    <div>
      <AddPersonUnit {...props} standardRoles={standardRoles} callbackParent={handleGetProject} />
      <Table
        className="d-table-center-container"
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey={record => record.id}
        bordered
      />
    </div>
  );
};

/**
* 新增项目成员组件
*/
const AddPersonUnit = (props) => {

  const [form] = Form.useForm();

  // 状态控制
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [globalUsers, setGlobalUsers] = useState(false);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  }

  // 获取所有人员
  const handleGetUsers = async () => {
    let res = await getUsers();
    setGlobalUsers(res.users);
  }

  // 提交表单
  const onFinish = async (values) => {

    const { userIds, roleCode } = values;

    let datas = {};

    datas.users = userIds.map((userId) => {
      return {
        userId,
        roleCode
      }
    });

    setLoading(true);

    let res = await setProjectPerson(props.project.uuid, datas);

    setLoading(false);

    if (res.errcode >= 0) {
      form.resetFields();
      message.success('项目人员添加成功！');
      props.callbackParent(); // 通知父容器
    }

  };

  // 表单布局
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <div style={{marginBottom:15}}>
      {
        isVisible ?
          <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{
              type: '客户定制开发类',
              stage: '开始',
            }}
            onFinish={onFinish}
            className="d-addperson"
          >
            <Form.Item
              label="人员"
              name="userIds"
              rules={[
                {
                  required: true,
                  message: '请选择人员！',
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择人员"
              >
                {
                  globalUsers.map((user) => {
                    return <Option key={user.id} value={user.id}>{user.name} { user.mobile && <small className="d-text-gray">{user.mobile.slice(6, 10)}</small> }</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="角色"
              name="roleCode"
              rules={[
                {
                  required: true,
                  message: '请选择角色！',
                },
              ]}
            >
              <Select
                placeholder="请选择角色"
              >
                {
                  props.standardRoles.map((role) => {
                    return <Option key={role.id} value={role.code}>{role.name} <small className="d-text-gray">{role.shorthand}</small></Option>
                  })
                }
              </Select>
            </Form.Item>
            <div className="d-textalign-center">
              <Button loading={loading} type="primary" htmlType="submit">立即添加</Button>
              <Button type="dashed" onClick={handleVisible} style={{marginLeft:15}}>取消</Button>
            </div>
          </Form>
        :
          <Button type="primary" onClick={handleVisible}>添加人员</Button>
      }
    </div>
  )
}

export default SetPersonUnit;