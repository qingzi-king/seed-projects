import React from 'react';
import {
  LoadingOutlined
} from '@ant-design/icons';
import './Common.less';

const Warning = (props) => {
  const { type } = props;

  if (type === 'selectMenu') {
    return (
      <center style={{marginTop:'3rem'}}>
        <embed src="http://docs.antjob.ink/funenc/settings_tab_mgiw.svg" width="500" height="200" type="image/svg+xml" />
        <div className="d-margin-15-0">请选择左侧菜单栏！</div>
      </center>
    )
  }

  if (type === 'card-loading') {
    return (
      <center style={{marginTop:'3rem'}}>
        <embed src="http://docs.antjob.ink/funenc/Ride_till_I_can_no_more_44wq.svg" className="d-opacity-loop" width="500" height="200" type="image/svg+xml" />
        <div className="d-margin-15-0"><LoadingOutlined /> 数据加载中...</div>
      </center>
    )
  }

  if (type === 'loading') {
    return (
      <center>
        <div className="d-margin-15-0"><LoadingOutlined /> 数据加载中...</div>
      </center>
    )
  }

  return (
    <center>....</center>
  );
}

export default Warning;