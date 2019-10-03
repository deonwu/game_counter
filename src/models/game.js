
export default {

  namespace: 'game',

  state: {
    book: {total: 0,
      win: 10000,
      loss: -10000
    },
    member_list:[1,2,3,4],
    
    action_list:[1,2,3,4]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
