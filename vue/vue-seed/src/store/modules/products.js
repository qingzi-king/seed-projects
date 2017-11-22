import api from '../../service/api'

// initial state
const state = {
  all: ['hello','carkings','nimei','!'],
  user: {}
}

// getters
const getters = {
  allProducts: state => state.all,
  userInfo: state => state.user
}

// actions
const actions = {
  submitProducts ({ commit, state }, products) {
    api.getWechatAuth('wangqingzi').then((res) => {
      commit('submitProductDatas', products);
      commit('addUserInfo', res);
    })
  }
}

/**
 * // 以荷载形式分发
 * commit('submitProductDatas', products);
 * // 以对象形式分发
 * commit({
 *   type: 'submitProductDatas',
 *   name: 'zhangsan'
 * });
 */

// mutations
const mutations = {
  submitProductDatas(state, datas) {
    console.log('mutation datas：', datas)
    state.all = datas;
  },
  addUserInfo(state, datas) {
    console.log('mutation userInfo：', datas)
    state.user = datas.userInfo;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
