import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { ComponentType } from 'react';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
  };
};

const DialogsContainer = compose<ComponentType>(
  WithAuthRedirect,
  connect(mapStateToProps, { sendMessage: actions.sendMessageCreator })
)(Dialogs);

export default DialogsContainer;
