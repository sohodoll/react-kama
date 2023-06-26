import { stopSubmit } from 'redux-form';
import { usersAPI, profileAPI } from '../api/api';
import { PostType, ProfileType, PhotosType } from '../types/types';
import {} from 'redux-thunk';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

const postsData = [
  { id: 1, message: 'Hi, how are you?', likesCount: 12 },
  { id: 2, message: "It's my first post!", likesCount: 11 },
  { id: 3, message: "It's my first post!", likesCount: 12 },
  { id: 4, message: "It's my first post!", likesCount: 12 },
  { id: 5, message: "It's my first post!", likesCount: 11 },
] as Array<PostType>;

const initialState = {
  posts: postsData,
  profile: null as ProfileType | null,
  status: '',
};

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
  setPhoto: (photos: PhotosType) => ({ type: 'SAVE_PHOTO', photos } as const),
};

type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }

    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }

    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case 'SAVE_PHOTO': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }

    // case 'SAVE_PROFILE': {
    //   return {
    //     ...state,
    //     profile: { ...state.profile, ...action.profile },
    //   };
    // }

    default:
      return state;
  }
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    if (!userId) {
      userId = 29085;
    }
    usersAPI.getUser(userId).then((data) => {
      dispatch(actions.setUserProfile(data));
    });
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.resultCode === 0) {
      dispatch(actions.setPhoto(response.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }));
      return Promise.reject(response.messages[0]);
    }
  };
