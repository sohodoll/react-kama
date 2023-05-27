import React from 'react';
import s from './ProfileInfo.module.css';
import { Preloader } from '../../Preloader/Preloader';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img className={s.icon} src='https://cdn-icons-png.flaticon.com/512/666/666201.png' alt='' />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt='' />
        <p>{props.profile.fullName}</p>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
