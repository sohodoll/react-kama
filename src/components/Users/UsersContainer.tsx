import { connect } from 'react-redux'
import React, { ComponentType } from 'react'
import { Users } from './Users'
import { follow, unfollow, getUsers, actions, FilterType } from '../../redux/usersReducer'
import { Preloader } from '../Preloader/Preloader'
import { compose } from 'redux'
import { withRouter } from '../../utils/withRouter'
import {
  selectUsersSuper,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersFilters,
} from '../../redux/usersSelectors'
import { AppStateType } from '../../redux/reduxStore'

type MapStateToPropsType = {
  users: Array<any>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  filter: FilterType
}

type MapDispatchToPropsType = {
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type UsersContainerProps = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<UsersContainerProps> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize, { term: '', friend: null })
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
  }

  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(1, this.props.pageSize, filter)
  }

  render() {
    const pagesCount = 7
    const pages = []

    for (let i = 1; i <= pagesCount + 1; i++) {
      pages.push(i)
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
            onFilterChanged={this.onFilterChanged}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    )
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
    filter: getUsersFilters(state),
  }
}

export const UsersContainer = compose<ComponentType>(
  withRouter,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage: actions.setCurrentPage,
    toggleFollowingProgress: actions.toggleFollowingProgress,
    getUsers,
  })
)(UsersAPIComponent)
