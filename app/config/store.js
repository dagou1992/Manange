import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import { applyMiddleware,createStore } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger'
import { Router, hashHistory,browserHistory} from "react-router";
import  reducer  from ".././Reducer/reducer";
import thunk from 'redux-thunk';
//  任何被发送到 store 的 action 都会经过 middleware
const middleware = [
    thunk,
    createLogger({ collapsed: true })// 调用日志打印方法
];
const store = createStore(reducer, applyMiddleware(...middleware));
//const history = syncHistoryWithStore(browserHistory, store)
export default store;
