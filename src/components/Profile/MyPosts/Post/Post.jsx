/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src='https://cdn-icons-png.flaticon.com/128/3082/3082351.png' />
      <span className={s.like}>
        <span>{props.likesCount}</span>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnBlK_Dcb2xIPJe6KfZrqbuR2lFrBUF0mKg&usqp=CAU' alt='' />
      </span>
      <span className={s.text}>{props.message}</span>
      <div></div>
    </div>
  );
};

export default Post;
