import { combineReducers, createStore } from 'redux';
import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { sidebarReducer } from './sidebarReducer';
import { usersReducer } from './usersReducer';

export let messagesData = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'How is your it-kamasutra?' },
  { id: 3, message: 'Yo' },
  { id: 4, message: 'Yo' },
  { id: 5, message: 'Yo' },
];

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

export let dialogsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Sasha' },
  { id: 5, name: 'Viktor' },
  { id: 6, name: 'Valera' },
];

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
});

export const store = createStore(reducers);
