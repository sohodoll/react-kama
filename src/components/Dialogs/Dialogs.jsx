import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = props.state.messages.map((m) => <Message message={m.message} id={m.id} key={m.id} />);

  let addMessageElement = React.createRef();

  const addMessage = () => {
    let text = addMessageElement.current.value;
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea className={s.addMessage} ref={addMessageElement} name='message' id='message' cols='30' rows='10'></textarea>
      <button className={s.button} onClick={addMessage}>
        add message
      </button>
    </div>
  );
};

export default Dialogs;
