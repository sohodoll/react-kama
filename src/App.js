import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { UsersContainer } from './components/Users/UsersContainer';
import { withRouter } from './utils/withRouter';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { Login } from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import { Preloader } from './components/Preloader/Preloader';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/reduxStore';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer').then((module) => ({ default: module.ProfileContainer }))
);

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert(promiseRejectionEvent);
    console.error(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar state={this.props.state.sidebar} />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path='/profile/' element={<ProfileContainer />}></Route>
            <Route path='/profile/:id' element={<ProfileContainer />}></Route>
            <Route path='/dialogs/' element={<DialogsContainer />}></Route>
            <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
            <Route path='/users' element={<UsersContainer pageTitle={'Самураи'} />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
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
    <Router basename='/'>
      <Provider store={store}>
        <AppContainer state={store.getState()} />
      </Provider>
    </Router>
  );
};
