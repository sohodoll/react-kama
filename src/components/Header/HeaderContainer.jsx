import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../redux/authReducer';

export class HeaderContainerAPI extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  auth: state.auth,
});

export const HeaderContainer = connect(mapStateToProps, { getAuthUserData })(HeaderContainerAPI);
