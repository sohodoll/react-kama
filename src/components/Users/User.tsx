import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { UserType } from '../../types/types';
import { FC } from 'react';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

export const User: FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
  const URL = 'https://images.thevoicemag.ru/upload/img_cache/522/522db8cc3ceff99287a983d9977b4980_ce_2111x1408x0x165_cropped_666x444.jpg';
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img className={styles.avatar} src={user.photos.small ? user.photos.small : URL} alt='' />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>

        <div></div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{1}</div>
          <div>{1}</div>
        </span>
      </span>
    </div>
  );
};
