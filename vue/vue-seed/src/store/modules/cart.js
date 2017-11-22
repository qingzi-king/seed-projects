
// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: 'normal'
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
