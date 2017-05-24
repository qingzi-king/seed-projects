import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

import { message } from 'antd';

var errorMessages = (res) => `${res.status} ${res.statusText}`;
var globalError   = false;

function checkCodeError(res) {
  if (res.status != 200) {
    globalError = true;
    message.error("当前操作发生了偶然错误");
  }

  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {

  if(globalError){
    res.jsonResult.msg ? message.error(res.jsonResult.msg) : message.error("当前操作真的发生错误啦");
    return Promise.reject();
  }

  return res;
}

function xFetch(url, options) {

  globalError = false; // 重置变量

  var opts = { ...options };

  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || '',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, opts)
    .then(checkCodeError)
    .then(jsonParse)
    .then(errorMessageParse)
}

export default xFetch;
