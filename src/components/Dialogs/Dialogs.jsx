import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={'textarea'} name='newMessageBody' placeholder='Enter your message' className={s.addMessage}></Field>
      <button className={s.button}>Send Message</button>
    </form>
  );
};

const ReduxAddMessageForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = state.messages.map((m) => <Message message={m.message} id={m.id} key={m.id} />);

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <ReduxAddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
