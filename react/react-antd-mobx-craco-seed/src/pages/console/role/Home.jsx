import React, { Component, useState, useEffect } from 'react';
import { Table} from 'antd';
import { getStandardRoles } from '../../../services/api';

const RoleUnit = (props) => {

  // 状态控制
  const [loading, setLoading] = useState(true);
  const [standardRoles, setStandardRoles] = useState([]);

  useEffect(() => {
    handleGetStandardRoles();
    return () => {
      // 销毁处理...
    }
  }, []);

  // 获取标准角色
  const handleGetStandardRoles = async () => {
    let res = await getStandardRoles('?type=detail');
    setStandardRoles(res.standardRoles);
    setLoading(false);
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
      title: '名称',
      dataIndex: 'name',
      width: 120,
      render: (text, record) => {
        return text || '/';
      }
    },
    {
      title: '简称',
      dataIndex: 'shorthand',
      width: 80,
      render: (text, record) => {
        return text || '/';
      }
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
      title: '职责',
      dataIndex: 'duty',
      render: (text, record) => {
        return text || '/';
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 120,
      render: (text, record) => {
        return global.G_DATE_FORMAT(text);
      }
    }
  ];

  return (
    <div>
      <Table
        className="d-table-center-container"
        dataSource={standardRoles}
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey={record => record.id}
        bordered
      />
    </div>
  );

}

export default RoleUnit;