import { Toast } from 'antd-mobile';
import store from 'storejs';

export default {

  namespace: 'game',

  state: {
    book: {
      total: 0,
      win: 10000,
      loss: -10000
    },
    
    member_list:[],
    
    action_list:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        console.log(",,,l:", pathname);
        if (pathname === '/counter' || pathname === '/') {
          dispatch({ type: 'init', payload: query });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  
    *init({ payload }, { put, select }) {  // eslint-disable-line
      const curUser = yield select(state => state.game.member_list);
      
      //已经初始化过了
      if(curUser && curUser.length) {
        return;
      }
      
      const u = store("user_list");
      if(u){
        const uList = JSON.parse(u);
        if(uList && uList.length > 0){
          yield put({type: 'userList', member_list: uList, ignoreStore: true});
        }
      }
  
      const ac = store("action_list");
      if(ac){
        const acList = JSON.parse(ac);
        if(acList && acList.length > 0){
          yield put({type: 'opList', action_list: acList, ignoreStore: true});
        }
      }
    },
  
    *newUser({ newName, newMoney, cb }, { call, put, select }) {  // eslint-disable-line
      
      if(newName && newMoney) {
        const curUser = yield select(state => state.game.member_list);
        const name = newName.trim();
        if(name.length <= 0 || name.length > 6){
          Toast.fail("成员名字长度1~6字符!");
          
          return;
        }
        const im = parseInt(newMoney);
        if(im <= 0 || im > 10000000){
          Toast.fail("金额只能0~10,000,000");
          
          return;
        }
        
        if(curUser.filter(x=>x.name === name).length > 0){
          Toast.fail("成员名字已经存在:" + name);
        }else {
          yield put({type: 'userList', member_list: [...curUser, {name: newName, allMoney: im, balance: im, loss: 0}]});
  
          const actionList = yield select(state => state.game.action_list);
          yield put({type: 'opList', action_list: [...actionList, {name: newName, allMoney: im, time: new Date()}]});
          
          cb && cb();
        }
      }else {
        Toast.fail("成员名字长度1~6字符!");
      }
    },
  },

  reducers: {
    userList(state, action) {
      if(!action.ignoreStore) {
        store("user_list", JSON.stringify(action.member_list));
      }
      return { ...state, member_list: action.member_list };
    },
  
    opList(state, action) {
      if(!action.ignoreStore) {
        store("action_list", JSON.stringify(action.action_list));
      }
      
      return { ...state, action_list: action.action_list };
    },
    
  },

};
