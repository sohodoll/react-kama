import React from 'react';
import s from '../Dialogs.module.css';
import { Link } from 'react-router-dom';

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;

  return (
    <div className={s.dialog + ' ' + s.active}>
      <Link to={path}>{props.name}</Link>
    </div>
  );
};

export default DialogItem;
