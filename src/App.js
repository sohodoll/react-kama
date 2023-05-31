import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { ProfileContainer, withRouter } from './components/Profile/ProfileContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { Login } from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import { Preloader } from './components/Preloader/Preloader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/reduxStore';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar state={this.props.state.sidebar} />
        <Routes>
          <Route path='/profile/' element={<ProfileContainer />}></Route>
          <Route path='/profile/:id' element={<ProfileContainer />}></Route>
          <Route path='/dialogs/' element={<DialogsContainer />}></Route>
          <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
          <Route path='/users' element={<UsersContainer />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export const AppContainer = compose(connect(mapStateToProps, { initializeApp }), withRouter)(App);

export const SamuraiJSApp = (props) => {
  return (
    <Router>
      <Provider store={store}>
        <AppContainer state={store.getState()} />
      </Provider>
    </Router>
  );
};
