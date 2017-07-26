import { showProject } from '../services/users';

const users = {

  namespace: 'users',

  state: {
    loading: false,
    name: '重庆交控',
    age: 23,
    addr: '中国重庆',
    goods: {
      name: '重庆',
      price: 5,
      numbers: 100,
      showTotal: total => `共 ${total} 条`,
    },
    lists: [{
      name: '张三',
      age: 12,
    }, {
      name: '李四',
      age: 33,
    }, {
      name: '王五',
      age: 55,
    }],
    projectInfo: {}, // 数据初始化可以不用初始化数据结构
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const datas = yield call(showProject, 1);
      if (datas.err) {
        console.log('输出：', datas.err);
        yield put({ type: 'hiddenLoading' });
      } else {
        console.log(datas);
        yield put({
          type: 'saveProjectInfo',
          payload: datas.data.project,
        });
      }
    },
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log('fetch...');
      yield put({ type: 'save' });
    },
  },

  reducers: {
    // 建议最多一层嵌套，以保持 state 的扁平化，深层嵌套会让 reducer 很难写和难以维护。
    // action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。
    showLoading (state) {
      return { ...state, loading: true };
    },
    hiddenLoading (state) {
      return { ...state, loading: false };
    },
    saveProjectInfo(state, action) {
      return {
        ...state,
        projectInfo: action.payload,
        loading: false,
      };
    },
    save(state, action) {
      console.log('save...');
      return { ...state};
    },
    edit(state, action) {
      console.log('edit...');
      return { ...state, name: action.name };
    },
    objChange(state, action) {
      console.log('obj change...');
      const {numbers} = action.payload;
      return {
        ...state,
        goods: {
          // 将之前的数据先赋值传进来，再将要改变的变量覆盖
          ...state.goods,
          numbers: numbers,
        }
      };
    },
    arrChange(state, action) {
      console.log('arr change...');
      const {lists} = action.payload;
      return {
        ...state,
        lists,
      };
    },
    clearDatas(state, action) {
      console.log('clear datas...');
      return {
        ...state,
        projectInfo: {
          ...state.projectInfo,
          Users: []
        },
      };
    },

  }

};

export default users;

/*

  提示：

  State：操作的时候每次都要当作不可变数据（immutable data）来对待，保证每次都是全新对象，没有引用关系，这样才能保证 State 的独立性，便于测试和追踪变化。
  Action

  dispatch(state, action)
  reducers (action)
  effects
  subscriptions
  //对不只属于模块内地state方法区别于resource公用的方法（便于区分）

*/
