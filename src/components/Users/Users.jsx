import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
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
                  onClick={() => {
                    axios
                      .delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '79d82f0b-b654-4c8d-b40c-bf592e72e276',
                        },
                      })
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(user.id);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': '79d82f0b-b654-4c8d-b40c-bf592e72e276',
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(user.id);
                        }
                      });
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
