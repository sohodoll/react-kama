import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export class ProfileContainerAPI extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.id;
    if (!userId) {
      userId = 29085;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to='/login' />;
    }
    return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
});

export const ProfileContainer = compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  WithAuthRedirect
)(ProfileContainerAPI);
