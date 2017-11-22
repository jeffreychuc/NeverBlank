import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import createStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  console.log("loading entry");
  const root = document.getElementById('root');
  const store = createStore();
  ReactDOM.render(<Root store={store} />, root);
});
