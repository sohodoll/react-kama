import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component) {
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
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

const withURLDatProfileContainer = withRouter(ProfileContainerAPI);

export const ProfileContainer = connect(mapStateToProps, { getUserProfile })(withURLDatProfileContainer);
