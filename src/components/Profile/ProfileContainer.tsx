/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

export interface RouteComponentProps<P> {
  match: match<P>;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const ProfileContainerAPI: FC<MapStatePropsType & DispatchPropsType & PathParamsType> = (props) => {
  useEffect(() => {
    let userId = props.router.params.id;
    if (!userId) {
      userId = props.authorizedUserId;
    }
    props.getUserProfile(userId);
    props.getStatus(userId);
  }, [props.router.params.id]);

  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }
  return (
    <Profile
      {...props}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      isOwner={!props.router.params.id}
      savePhoto={props.savePhoto}
    />
  );
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: any) => Promise<any>;
};
type PathParamsType = {
  router: {
    params: {
      id: number;
    };
  };
};

export const ProfileContainer = compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  WithAuthRedirect
)(ProfileContainerAPI);
