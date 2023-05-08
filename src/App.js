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
        <Route
          path='/profile'
          element={<Profile store={props.store} profilePage={props.state.profilePage} dispatch={props.dispatch} />}
        ></Route>
        <Route path='/dialogs/' element={<DialogsContainer store={props.store} />}></Route>
        <Route path='/dialogs/:id' element={<DialogsContainer store={props.store} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
