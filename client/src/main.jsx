import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './ant-variables.less';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

