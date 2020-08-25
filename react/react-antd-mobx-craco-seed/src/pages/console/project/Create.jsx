import React, { Component, useState } from 'react';
import { Spin, Form, Input, Button, DatePicker, Select, message } from 'antd';
import { createProject } from '../../../services/api';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const Home = (props) => {

  // 状态控制
  const [loading, setLoading] = useState(false);

  // 取消表单
  const onCancel = values => {
    props.onclose('cancel');
  };

  // 提交表单
  const onFinish = async (values) => {

    const { name, dateRange, describe, stage, type } = values;

    let datas = {
      name,
      stage,
      type,
      describe
    };

    if (dateRange) {
      datas.startTime = dateRange[0];
      datas.endTime = dateRange[1];
    }

    setLoading(true);

    let res = await createProject(datas);

    setLoading(false);

    if (res.errcode >= 0) {
      message.success('项目创建成功！');
      props.callbackParent(); // 关闭父容器
    }

  };

  // 表单布局
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          type: '客户定制开发类',
          stage: '开始',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="项目名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入项目名称！',
            },
          ]}
        >
          <Input placeholder="输入项目名称（可以使用中英文、数字组合）" />
        </Form.Item>
        <Form.Item
          label="起止时间"
          name="dateRange"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="describe"
        >
          <TextArea rows={4} placeholder="100字以内项目描述（选填）" />
        </Form.Item>
        <Form.Item
          label="项目类型"
          name="type"
        >
          <Select placeholder="选择项目类型">
            {
              global.G_ENUM.projectTypes.map((type, index) => {
                return <Option key={index} value={type}>{type}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="项目阶段"
          name="stage"
        >
          <Select placeholder="选择项目阶段">
            {
              global.G_ENUM.projectStages.map((type, index) => {
                return <Option key={index} value={type}>{type}</Option>
              })
            }
          </Select>
        </Form.Item>

        <div className="d-textalign-center">
          <Button loading={loading} type="primary" htmlType="submit">立即新建</Button>
          <Button type="dashed" onClick={onCancel} style={{marginLeft:15}}>取消</Button>
        </div>
      </Form>
    </Spin>
  );
};

export default Home;