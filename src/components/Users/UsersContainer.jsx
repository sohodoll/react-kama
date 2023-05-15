import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import { Users } from './Users';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, unfollow, setIsFetching } from '../../redux/usersReducer';
import { Preloader } from '../Preloader/Preloader';

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true);
    if (this.props.users.length === 0) {
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
          this.props.setIsFetching(false);
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount);
          console.log(this.props.isFetching);
        });
    } else {
      this.props.setIsFetching(false);
    }
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then((response) => {
      this.props.setUsers(response.data.items);
      this.props.setIsFetching(false);
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
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            onPageChange={this.onPageChange}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

export const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
})(UsersAPIComponent);
