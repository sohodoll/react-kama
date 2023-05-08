export let friendsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
];

const initialState = {
  friends: friendsData,
};

export const sidebarReducer = (state = initialState, action) => {
  return state;
};
