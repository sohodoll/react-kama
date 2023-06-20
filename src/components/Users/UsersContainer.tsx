import { connect } from 'react-redux';
import React from 'react';
import { Users } from './Users';
import { follow, unfollow, getUsers, actions } from '../../redux/usersReducer';
import { Preloader } from '../Preloader/Preloader';
import { compose } from 'redux';
import { withRouter } from '../../utils/withRouter';
import {
  selectUsersSuper,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
} from '../../redux/usersSelectors';
import { AppStateType } from '../../redux/reduxStore';

type MapStateToPropsType = {
  users: Array<any>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

type MapDispatchToPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type UsersContainerProps = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersAPIComponent extends React.Component<UsersContainerProps> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber: number) => {
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
        <h2> {this.props.pageTitle} </h2>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            onPageChange={this.onPageChange}
            currentPage={this.props.currentPage}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: selectUsersSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export const UsersContainer = compose<React.Component>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage: actions.setCurrentPage,
    toggleFollowingProgress: actions.toggleFollowingProgress,
    getUsers,
  }),
  withRouter
)(UsersAPIComponent);
