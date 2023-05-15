import axios from 'axios';
import styles from './styles.module.css';
import React from 'react';
const URL = 'https://images.thevoicemag.ru/upload/img_cache/522/522db8cc3ceff99287a983d9977b4980_ce_2111x1408x0x165_cropped_666x444.jpg';

export class Users extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount);
          console.log(response.data.totalCount);
        });
    }
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then((response) => {
      this.props.setUsers(response.data.items);
    });
  };

  render() {
    // const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
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
                this.onPageChange(page);
              }}
              className={this.props.currentPage === page && styles.selected}
            >
              {page}
            </span>
          ))}
        </div>
        {this.props.users.map((user) => (
          <div>
            <span>
              <div>
                <img className={styles.avatar} src={user.photos.small ? user.photos.small : URL} alt='' />
              </div>
              <div>
                {user.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(user.id);
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
  }
}
