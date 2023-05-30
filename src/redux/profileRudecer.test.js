import { addPostActionCreator, deletePost, postsData, profileReducer } from './profileReducer';

const state = {
  posts: postsData,
  profile: null,
  status: '',
};
const action = addPostActionCreator('it-kamasutra.com');

it('new post should be added', () => {
  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(6);
});

it('new post should be added with correct message', () => {
  const state = {
    posts: postsData,
    profile: null,
    status: '',
  };
  const action = addPostActionCreator('it-kamasutra.com');
  const newState = profileReducer(state, action);

  expect(newState.posts[5].message).toBe('it-kamasutra.com');
});

it('length after deleting should decrement', () => {
  const state = {
    posts: postsData,
    profile: null,
    status: '',
  };
  const action = deletePost(1);
  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});
