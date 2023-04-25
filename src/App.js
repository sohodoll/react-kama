import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = (props) => {
  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/dialogs' element={<Dialogs />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
