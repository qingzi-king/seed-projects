/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-07-31 09:25:21
 */
import axios from 'axios';
import { message } from 'antd';
import {
  remove,
  findLast
} from 'lodash';
const baseWaitTime = 500; // 默认的等待时间500毫秒

const requestURLRate = []; // 如：{ api: '/api/standardRoles', timestamp: 1596597701181 }

/**
 * 请求出入口
 * @param {*} api 地址
 * @param {*} method 方法，默认为GET
 * @param {*} params 参数，默认为空对象
 * @param {*} maxRequestCycleCount 最大请求频次（与baseWaitTime结合），默认为1
 * @param {*} serverHost 接口主机地址
 * @param {*} headers 传入头部信息，默认为空对象
 */
export default function axiosRequest(api, method = 'GET', params = {}, maxRequestCycleCount = 1, serverHost, headers = {}) {

  // 针对非GET请求进行限流拦截
  if (method != 'GET') {

    let nowTimestamp = new Date().getTime(); // 当前时间戳

    // 去除当前接口指定周期外的数据
    remove(requestURLRate, (o) => {
      return o.api === api && o.timestamp < nowTimestamp - (maxRequestCycleCount * baseWaitTime);
    });

    // 获取上一次请求信息（一般同周期只有一个，防止处理意外）
    let hasRequestURLRate = findLast(requestURLRate, o => (o.api === api));

    if (hasRequestURLRate) {

      message.warning('当前访问的频次过高，请适当放慢手速！', 1);

      // 为了保持数据完整性，返回数据与接口定义一致
      return {
        errcode: -100,
        msg: null
      };

    } else {
      requestURLRate.push({
        api,
        timestamp: new Date().getTime()
      });
    }

  }

  return new Promise((resolve, reject) => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImRpbmd0YWxrSWQiOiJtYW5hZ2VyNzg1MCIsImlhdCI6MTU5NjA5MzIzMywiZXhwIjoxNTk3Mzg5MjMzfQ.DREiuE1SYBlazQT1lxCLtLIkGsRSRVnkdrp_FqeDdQE';
    axios({
      method,
      headers: {
        ...headers,
        authorization: 'Bearer ' + token,
      },
      url: (serverHost || global.G_SERVER_HOST) + api,
      data: params
    })
    .then((res) => {

      if (res.data.errcode && res.data.errcode < 0) {
        message.error(res.data.msg || '请求错误！');
        console.log(JSON.stringify(res.data));
      }

      resolve(res.data);

    })
    .catch((error) => {

      if (error) {
        message.error('服务端发生逻辑错误！');
      }

      reject(error);

    })
  })
}