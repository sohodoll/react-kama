import React, { ComponentType, FC, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { UsersPage } from './components/Users/UsersContainer'
import { withRouter } from './utils/withRouter'
import { HeaderContainer } from './components/Header/HeaderContainer'
import { Login } from './components/Login/Login'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import { Preloader } from './components/Preloader/Preloader'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppStateType, store } from './redux/reduxStore'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer').then((module) => ({ default: module.ProfileContainer }))
)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializeApp: () => void }

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert(promiseRejectionEvent)
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar state={this.props.sidebar} />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path='/profile/' element={<ProfileContainer />}></Route>
            <Route path='/profile/:id' element={<ProfileContainer />}></Route>
            <Route path='/dialogs/' element={<DialogsContainer />}></Route>
            <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
            <Route path='/users' element={<UsersPage />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  sidebar: state.sidebar,
})

export const AppContainer = compose<ComponentType>(connect(mapStateToProps, { initializeApp }), withRouter)(App)

type PropsType = {
  store: typeof store
}

export const SamuraiJSApp: FC<PropsType> = () => {
  return (
    <Router basename='/'>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Router>
  )
}
