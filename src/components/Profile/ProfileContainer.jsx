import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profileReducer';
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
    this.props.getUserProfile(this.props.router.params.id);
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to='/login' />;
    }
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

export const ProfileContainer = compose(connect(mapStateToProps, { getUserProfile }), WithAuthRedirect, withRouter)(Profile);
