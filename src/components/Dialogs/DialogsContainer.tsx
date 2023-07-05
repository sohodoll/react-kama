import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
  };
};

const DialogsContainer = compose(connect(mapStateToProps, { sendMessage: actions.sendMessageCreator })(Dialogs), WithAuthRedirect);

export default DialogsContainer;
