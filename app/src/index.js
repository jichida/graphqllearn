import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './env/root';

// import config from './env/config';
// import {generatersapair} from './util/rsa';
// import VConsole from 'vconsole';
// import 'moment/locale/zh-cn';

import {
  registerandroid
} from './env/android';
// const vConsole = new VConsole();
registerandroid();

ReactDOM.render( < Approot / > ,
    document.getElementById('root'));
