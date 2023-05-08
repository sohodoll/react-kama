import { store } from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let renderEntireTree = (state) => {
  root.render(
    <Router>
      <React.StrictMode>
        <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
      </React.StrictMode>
    </Router>
  );
};

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);
