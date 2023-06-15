import { stopSubmit } from 'redux-form';
import { usersAPI, profileAPI } from '../api/api';
import { FriendsType, PostType, ProfileType, PhotosType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxStore';

/* eslint-disable default-case */
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';
const SAVE_PROFILE = 'SAVE_PROFILE';

export let postsData = [
  { id: 1, message: 'Hi, how are you?', likesCount: 12 },
  { id: 2, message: "It's my first post!", likesCount: 11 },
  { id: 3, message: "It's my first post!", likesCount: 12 },
  { id: 4, message: "It's my first post!", likesCount: 12 },
  { id: 5, message: "It's my first post!", likesCount: 11 },
] as Array<PostType>;

export let friendsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
] as Array<FriendsType>;

const initialState = {
  posts: postsData,
  profile: null as ProfileType | null,
  status: '',
};

type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
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

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case SAVE_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }

    case SAVE_PROFILE: {
      return {
        ...state,
        profile: { ...state.profile, ...action.profile },
      };
    }

    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

type SetPhotoType = {
  type: typeof SAVE_PHOTO;
  photos: PhotosType;
};

type ActionsType = AddPostActionCreatorType | SetUserProfileType | SetStatusType | DeletePostType | SetPhotoType;

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status });
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, postId });
const setPhoto = (photos: PhotosType): SetPhotoType => ({ type: SAVE_PHOTO, photos });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    if (!userId) {
      userId = 29085;
    }
    usersAPI.getUser(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.resultCode === 0) {
      dispatch(setPhoto(response.data.photos));
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
