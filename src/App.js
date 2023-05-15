import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { ProfileContainer } from './components/Profile/ProfileContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar state={props.state.sidebar} />
      <Routes>
        <Route path='/profile' element={<ProfileContainer />}></Route>
        <Route path='/profile/:id' element={<ProfileContainer />}></Route>
        <Route path='/dialogs/' element={<DialogsContainer />}></Route>
        <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
        <Route path='/users' element={<UsersContainer />}></Route>
      </Routes>
    </div>
  );
};

export default App;
