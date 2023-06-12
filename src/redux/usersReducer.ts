import { usersAPI } from '../api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objectHelpers';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 4,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
};

type InitialStateType = typeof initialState;

export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: true }),
      };
    }

    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: false }),
      };
    }

    case SET_USERS: {
      return {
        ...state,
        users: [...action.users],
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.total,
      };
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      };
    }

    default: {
      return state;
    }
  }
};

type FollowSuccessType = {
  type: typeof FOLLOW;
  userID: number;
};

type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userID: number;
};

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  total: number;
};

type SetIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userID: number;
};

type ActionsType =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | SetIsFetchingType
  | ToggleFollowingProgressType;

export const followSuccess = (userID: number): FollowSuccessType => ({ type: FOLLOW, userID });
export const unfollowSuccess = (userID: number): UnfollowSuccessType => ({ type: UNFOLLOW, userID });
export const setUsers = (users: UserType[]): SetUsersType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (total: number): SetTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, total });
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userID,
});

//THUNKS

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };

export const follow =
  (userID: number): ThunkType =>
  async (dispatch, getState) => {
    dispatch(toggleFollowingProgress(true, userID));
    usersAPI.followUser(userID).then((data) => {
      if (data.resultCode === 0) {
        dispatch({ type: FOLLOW, userID });
      }
      dispatch(toggleFollowingProgress(false, userID));
    });
  };

export const unfollow =
  (userID: number): ThunkType =>
  async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userID));
    usersAPI.unfollowUser(userID).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userID));
      }
      dispatch(toggleFollowingProgress(false, userID));
    });
  };
