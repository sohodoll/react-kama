import { sendMessageCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

const DialogsContainer = compose(connect(mapStateToProps, mapDispatchToProps), WithAuthRedirect)(Dialogs);

export default DialogsContainer;
