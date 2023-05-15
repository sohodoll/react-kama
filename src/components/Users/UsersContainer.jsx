import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import { Users } from './Users';
import { followAC, setCurrentPageAC, setTotalUsersCountAc, setUsersAC, unfollowAC } from '../../redux/usersReducer';

class UsersAPIComponent extends React.Component {
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
      <Users
        onPageChange={this.onPageChange}
        currentPage={this.props.currentPage}
        users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (page) => {
      dispatch(setCurrentPageAC(page));
    },
    setTotalUsersCount: (total) => {
      dispatch(setTotalUsersCountAc(total));
    },
  };
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
