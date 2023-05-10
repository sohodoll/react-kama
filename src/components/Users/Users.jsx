import styles from './styles.module.css';

export const Users = (props) => {
  return (
    <div>
      {props.users.map((user) => (
        <div>
          <span>
            <div>
              <img className={styles.avatar} src={user.photoURL} alt='' />
            </div>
            <div>
              <button>{user.followed ? 'unfollow' : 'follow'}</button>
            </div>

            <div></div>
          </span>
          <span>
            <span>
              <div>{user.fullName}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{user.location.city}</div>
              <div>{user.location.country}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
