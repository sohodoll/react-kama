import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar state={props.state.sidebar} />
      <Routes>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/dialogs/' element={<DialogsContainer />}></Route>
        <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
      </Routes>
    </div>
  );
};

export default App;
