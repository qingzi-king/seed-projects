import axios from 'axios'

// api 路径
const HOST = 'http://localhost:39999';

export function fetch(url, method = 'GET', params) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: HOST + url,
      headers: {
        userid: null,
      },
      data: params
    })
    .then((response) => {

      resolve(response.data)

    })
    .catch((error) => {

      if(error.response.status == 401 || error.response.status == 500) return window.location.href = "/#/401";

      reject(error)
    })
  })
}

export default {

  /**
   * 用户code（微信免登）
   * @param {any} code
   * @returns
   */
  GetWechatAuth(code) {
    return fetch('/api/auth?code=' + code, 'GET');
  }

}
