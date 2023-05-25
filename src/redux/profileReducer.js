import { usersAPI, profileAPI } from '../api/api';

/* eslint-disable default-case */
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

export let postsData = [
  { id: 1, message: 'Hi, how are you?', likesCount: 12 },
  { id: 2, message: "It's my first post!", likesCount: 11 },
  { id: 3, message: "It's my first post!", likesCount: 12 },
  { id: 4, message: "It's my first post!", likesCount: 12 },
  { id: 5, message: "It's my first post!", likesCount: 11 },
];

export let friendsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
];

export const profileReducer = (
  state = {
    posts: postsData,
    profile: null,
    status: '',
  },
  action
) => {
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

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => (dispatch) => {
  if (!userId) {
    userId = 29085;
  }
  usersAPI.getUser(userId).then((data) => {
    dispatch(setUserProfile(data));
  });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.resultCode === 0) {
      console.log('asf');
      dispatch(setStatus(status));
    }
  });
};
