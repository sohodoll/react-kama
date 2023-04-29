import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addPost, handleInputChange } from './redux/state';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let renderEntireTree = (state) => {
  root.render(
    <Router>
      <React.StrictMode>
        <App state={state} addPost={addPost} handleInput={handleInputChange} />
      </React.StrictMode>
    </Router>
  );
};
