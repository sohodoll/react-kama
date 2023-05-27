import { connect } from 'react-redux';
import React from 'react';
import { Users } from './Users';
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsers } from '../../redux/usersReducer';
import { Preloader } from '../Preloader/Preloader';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { withRouter } from '../Profile/ProfileContainer';

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
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
            toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
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
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export const UsersContainer = compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
  }),
  withRouter
)(UsersAPIComponent);
