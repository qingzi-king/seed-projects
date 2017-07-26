
const apps = {

  namespace: 'apps',

  state: {
    name: '呵呵呵',
    age: 13,
    addr: '哈哈哈',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log('fetch-app...');
      yield put({ type: 'save' });
    },
  },

  reducers: {
    // 建议最多一层嵌套，以保持 state 的扁平化，深层嵌套会让 reducer 很难写和难以维护。
    save(state) {
      console.log('save-app...');
      return { ...state };
    },
    edit(state, action) {
      console.log('edit-app...');
      return { ...state, name: action.name };
    },
  },

};

export default apps;
