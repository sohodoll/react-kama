import React, { FC, Suspense } from 'react'
import { LaptopOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { UsersPage } from './components/Users/UsersContainer'
import { Login } from './components/Login/Login'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/reduxStore'
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer').then((module) => ({ default: module.ProfileContainer }))
)

const items1: MenuProps['items'] = ['MyProfile', '2', '3'].map((key) => ({
  key,
  label: key,
}))

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const itemsSideMenu: MenuItem[] = [
  getItem('My Profile', 'MyProfile', <UserOutlined />, [
    getItem(<Link to='/profile'>Profile</Link>, 'Profile'),
    getItem(<Link to='/dialogs'>Messages</Link>, 'Messages'),
  ]),

  getItem('Developers', 'Developers', <LaptopOutlined />, [
    getItem(<Link to='/users'>Users</Link>, 'DevelopersList'),
    getItem(<Link to='/chat'>Chat</Link>, 'DevelopersChat'),
  ]),

  getItem('Misc', 'Misc', <SettingOutlined />, [
    getItem(<Link to='/news'>News</Link>, 'News'),
    getItem(<Link to='/music'>Music</Link>, 'Music'),
  ]),
]

export const App: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Router basename='/'>
      <Provider store={store}>
        <Layout>
          {/* <div className={s.item}>
            <Link to='/profile'>Profile</Link>
          </div>
          <div className={`${s.item} ${s.active}`}>
            <Link to='/dialogs'>Dialogs</Link>
          </div>
          <div className={`${s.item} ${s.active}`}>
            <Link to='/users'>Users</Link>
          </div> */}

          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className='demo-logo' />
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} />
          </Header>
          <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={itemsSideMenu}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
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
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Provider>
    </Router>
  )
}

// class AppClass extends React.Component<MapPropsType & DispatchPropsType> {
//   catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
//     alert(promiseRejectionEvent)
//     console.error(promiseRejectionEvent)
//   }

//   componentDidMount() {
//     this.props.initializeApp()
//     window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//   }

//   render() {
//     if (!this.props.initialized) {
//       return <Preloader />
//     }

//     return (
//       <div className='app-wrapper'>
//         <HeaderContainer />
//         <Navbar state={this.props.sidebar} />
//         <Suspense fallback={<div>Loading</div>}>
//           <Routes>
//             <Route path='/profile/' element={<ProfileContainer />}></Route>
//             <Route path='/profile/:id' element={<ProfileContainer />}></Route>
//             <Route path='/dialogs/' element={<DialogsContainer />}></Route>
//             <Route path='/dialogs/:id' element={<DialogsContainer />}></Route>
//             <Route path='/users' element={<UsersPage />}></Route>
//             <Route path='/login' element={<Login />}></Route>
//           </Routes>
//         </Suspense>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state: AppStateType) => ({
//   initialized: state.app.initialized,
//   sidebar: state.sidebar,
// })

// export const AppContainer = compose<ComponentType>(connect(mapStateToProps, { initializeApp }), withRouter)(AppClass)

// type PropsType = {
//   store: typeof store
// }

// export const SamuraiJSApp: FC<PropsType> = () => {
//   return (
//     <Router basename='/'>
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     </Router>
//   )
// }
// type MapPropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = { initializeApp: () => void }
