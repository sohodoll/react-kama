import { connect } from 'react-redux';
import { Users } from './Users';
import { followAC, setCurrentPageAC, setTotalUsersCountAc, setUsersAC, unfollowAC } from '../../redux/usersReducer';

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

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
