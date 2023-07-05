import { FC } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../FormsControls/FormsControls';
import { maxLength30, requiredField } from '../../utils/validators/validators';
import { InitialStateType } from '../../redux/dialogsReducer';

type OwnPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

type PropsType = OwnPropsType & {
  dialogsPage: InitialStateType;
  sendMessage: (newMessageBody: string) => void;
};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={TextArea}
        validate={[requiredField, maxLength30]}
        name='newMessageBody'
        placeholder='Enter your message'
        className={s.addMessage}
      ></Field>
      <button className={s.button}>Send Message</button>
    </form>
  );
};

const ReduxAddMessageForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

const Dialogs: FC<PropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = state.messages.map((m) => <Message message={m.message} id={m.id} key={m.id} />);

  const addNewMessage = (values: NewMessageFormValuesType) => {
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
