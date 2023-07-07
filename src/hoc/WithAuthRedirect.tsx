import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../redux/reduxStore';

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = {
  isAuth: boolean;
};

export function WithAuthRedirect<WCP>(Component: ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
    if (!props.isAuth) return <Navigate to='/login' />;

    return <Component {...(props as WCP)} />;
  };

  const ConnectedRedirectComponent = connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToProps)(RedirectComponent);

  return ConnectedRedirectComponent;
}
