import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = state.messages.map((m) => <Message message={m.message} id={m.id} key={m.id} />);
  const newMessageBody = state.newMessageBody;

  let addMessageElement = React.createRef();

  const sendMessage = () => {
    props.sendMessage();
  };

  const onNewMessageChange = (e) => {
    const body = e.target.value;
    props.updateNewMessageBody(body);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea
        className={s.addMessage}
        ref={addMessageElement}
        name='message'
        id='message'
        cols='30'
        rows='10'
        value={newMessageBody}
        onChange={onNewMessageChange}
      ></textarea>
      <button className={s.button} onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default Dialogs;
