import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CheckApp from './CheckApp';
import store from './reducers';

ReactDOM.render(
        <CheckApp store={store}/>,
    document.getElementById('root'));
