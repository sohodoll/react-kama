import { usersAPI } from '../api/api';

/* eslint-disable default-case */
const ADD_POST = 'ADD-POST';
const UPDATE_MESSAGE = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
    newPostText: 'Write something!',
    profile: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case UPDATE_MESSAGE: {
      return {
        ...state,
        newPostText: action.newPostText,
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_MESSAGE,
  newPostText: text,
});

export const getUserProfile = (userId) => (dispatch) => {
  console.log(userId);
  if (!userId) {
    userId = 2;
  }
  usersAPI.getUser(userId).then((data) => {
    dispatch(setUserProfile(data));
  });
};
