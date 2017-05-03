// babel polyfill and file loader
import 'babel-polyfill';
require('file-loader?name=[name].[ext]!./index.html'); // load html for dev purpose
require('file-loader?name=[name].[ext]!./bootstrap.css');
require('./style.scss'); // styling

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './src/store'; // store data

import Layout from "./src/component"; // main wrapper

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
