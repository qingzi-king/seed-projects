/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-06-08 18:03:19
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/app.less';
import './routes/global';
import Routes from './routes/index';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import 'dayjs/locale/zh-cn';

// 安全模式下，有些第三方未按规定使用
// ReactDOM.render(
//   <React.StrictMode>
//     <Routes />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(<ConfigProvider locale={zhCN}><Routes /></ConfigProvider>, document.getElementById('root'));

serviceWorker.unregister();
