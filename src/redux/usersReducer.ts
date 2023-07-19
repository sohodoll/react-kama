import { usersAPI } from '../api/usersAPI'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/objectHelpers'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 4,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
}

export type InitialStateType = typeof initialState

export const actions = {
  followSuccess: (userID: number) => ({ type: 'FOLLOW', userID } as const),
  unfollowSuccess: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),
  setUsers: (users: UserType[]) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (total: number) => ({ type: 'SET_TOTAL_USERS_COUNT', total } as const),
  setIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userID: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userID,
    } as const),
}

type ActionsType = InferActionsTypes<typeof actions>

export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: true }),
      }
    }

    case 'UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: false }),
      }
    }

    case 'SET_USERS': {
      return {
        ...state,
        users: [...action.users],
      }
    }

    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }

    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }

    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.total,
      }
    }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      }
    }

    default: {
      return state
    }
  }
}

//THUNKS

type ThunkType = BaseThunkType<ActionsType>

export const getUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(actions.setIsFetching(false))
      dispatch(actions.setUsers(data.items))
      dispatch(actions.setTotalUsersCount(data.totalCount))
    })
  }

export const follow =
  (userID: number): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleFollowingProgress(true, userID))
    const data = await usersAPI.followUser(userID)

    if (data.resultCode === 0) {
      dispatch(actions.followSuccess(userID))
    }

    dispatch(actions.toggleFollowingProgress(false, userID))
  }

export const unfollow =
  (userID: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userID))
    usersAPI.unfollowUser(userID).then((data) => {
      if (data.resultCode === 0) {
        dispatch(actions.unfollowSuccess(userID))
      }
      dispatch(actions.toggleFollowingProgress(false, userID))
    })
  }
