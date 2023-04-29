import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img className={s.icon} src='https://cdn-icons-png.flaticon.com/512/666/666201.png' />
      </div>
      <div className={s.descriptionBlock}>ava + description</div>
    </div>
  );
};

export default ProfileInfo;
