/* eslint-disable default-case */
const ADD_POST = 'ADD-POST';
const UPDATE_MESSAGE = 'UPDATE-NEW-POST-TEXT';

export const profileReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = '';
      return state;
    case UPDATE_MESSAGE:
      state.newPostText = action.newPostText;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_MESSAGE,
  newPostText: text,
});
