import fetch from 'dva/fetch';
import { message } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else {

    response.json().then(jsonResult => {
      var errorMsg;
      if(jsonResult.msg) errorMsg = jsonResult.msg;
      message.error("当前操作发生了偶然错误！【"+errorMsg+"】");
    });

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  var opts = { ...options };

  opts.headers = {
    ...opts.headers,
    'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJtYW5hZ2VyNzg1MCIsImlhdCI6MTQ5MTUzMTg1NX0.E6oJK6a4qWQuPzeUHnoitVCTb1SIMj65uT9qD5XkMkg',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
