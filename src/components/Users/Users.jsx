import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
const URL = 'https://images.thevoicemag.ru/upload/img_cache/522/522db8cc3ceff99287a983d9977b4980_ce_2111x1408x0x165_cropped_666x444.jpg';

export const Users = (props) => {
  const pagesCount = 7;
  const pages = [];

  for (let i = 1; i <= pagesCount + 1; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((page) => (
          <span
            onClick={(e) => {
              props.onPageChange(page);
            }}
            className={props.currentPage === page && styles.selected}
          >
            {page}
          </span>
        ))}
      </div>
      {props.users.map((user) => (
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
                  disabled={props.followingInProgress.some((id) => id === user.id)}
                  onClick={() => {
                    props.unfollow(user.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === user.id)}
                  onClick={() => {
                    props.follow(user.id);
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
      ))}
    </div>
  );
};
