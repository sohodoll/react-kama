import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;

  const sendMessage = () => {
    props.store.dispatch(sendMessageCreator());
  };

  const onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={sendMessage} dialogsPage={state} />;
};

export default DialogsContainer;
