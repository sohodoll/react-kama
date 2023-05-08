import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, Routes } from 'react-router-dom';

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
        <Route path='/dialogs/' element={<Dialogs store={props.store} />}></Route>
        <Route path='/dialogs/:id' element={<Dialogs store={props.store} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
