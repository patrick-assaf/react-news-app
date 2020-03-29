import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const HelloWorld = props => (
    <h1>It Works!</h1>
);

ReactDOM.render(
    <HelloWorld />, document.getElementById('root')
);