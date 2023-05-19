import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { Login } from './components/Login/Login';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar state={props.state.sidebar} />
      <Routes>
        <Route path='/profile/:id?' element={<ProfileContainer />}></Route>
        <Route path='/dialogs/' element={<DialogsContainer />}></Route>
        <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
        <Route path='/users' element={<UsersContainer />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
