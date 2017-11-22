import axios from 'axios'

// api 路径
const server = 'http://salesman.cq-tct.com';

export function fetch(url, method = 'GET', params) {

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: server + url,
      headers: {
        authorization: localStorage.getItem('sales_token')
      },
      data: params
    })
    .then((response) => {

      resolve(response.data)

    })
    .catch((error) => {

      if(error.response.status == 401 || error.response.status == 500) return alert('系统发生偶然错误！');

      reject(error)
    })
  })
}

export default {

  // 根据wxId获取用户信息
  getWechatAuth(wxId) {
    return fetch('/auth/user/' + wxId)
  }

}
