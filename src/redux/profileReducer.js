/* eslint-disable default-case */
const ADD_POST = 'ADD-POST';
const UPDATE_MESSAGE = 'UPDATE-NEW-POST-TEXT';

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

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_MESSAGE,
  newPostText: text,
});
