import React from 'react';
import ReactDom from 'react-dom';

import style from '../styles/app.scss'

import App from './app.js';

const appContainer = document.querySelector('#js-app');
ReactDom.render(<App />, appContainer);
