// import React from 'react'
// import Header, { DispatchPropsType, MapPropsType } from './Header'
// import { connect } from 'react-redux'
// import { logout } from '../../redux/authReducer'
// import { AppStateType } from '../../redux/reduxStore'

// export class HeaderContainerAPI extends React.Component<MapPropsType & DispatchPropsType> {
//   componentDidMount() {}

//   render() {
//     return <Header {...this.props} />
//   }
// }

// const mapStateToProps = (state: AppStateType) => ({
//   isAuth: state.auth.isAuth,
//   login: state.auth.login,
//   auth: state.auth,
// })

// export const HeaderContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainerAPI)
