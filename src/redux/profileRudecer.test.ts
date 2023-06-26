import { actions, profileReducer } from './profileReducer';
import { ProfileType } from '../types/types';

const state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post!", likesCount: 11 },
    { id: 3, message: "It's my first post!", likesCount: 12 },
    { id: 4, message: "It's my first post!", likesCount: 12 },
    { id: 5, message: "It's my first post!", likesCount: 11 },
  ],
  profile: null as ProfileType | null,
  status: '',
};

const action = actions.addPostActionCreator('it-kamasutra.com');

it('new post should be added', () => {
  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(6);
});

it('new post should be added with correct message', () => {
  const action = actions.addPostActionCreator('it-kamasutra.com');
  const newState = profileReducer(state, action);

  expect(newState.posts[5].message).toBe('it-kamasutra.com');
});

it('length after deleting should decrement', () => {
  const action = actions.deletePost(1);
  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});
