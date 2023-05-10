const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const URL = 'https://images.thevoicemag.ru/upload/img_cache/522/522db8cc3ceff99287a983d9977b4980_ce_2111x1408x0x165_cropped_666x444.jpg';

const initialState = {
  users: [
    { id: 1, photoURL: URL, followed: false, fullName: 'Dima', status: 'I Love football', location: { city: 'Mins', country: 'Belarus' } },
    { id: 2, photoURL: URL, followed: false, fullName: 'Boba', status: 'I Love foosball', location: { city: 'Mins', country: 'Belarus' } },
    { id: 3, photoURL: URL, followed: true, fullName: 'Dimas', status: 'I Love football', location: { city: 'Mins', country: 'Belarus' } },
    { id: 4, photoURL: URL, followed: false, fullName: 'Dimax', status: 'I Love foosball', location: { city: 'Mins', country: 'Belarus' } },
  ],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: true,
            };
          }

          return user;
        }),
      };
    }

    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: false,
            };
          }

          return user;
        }),
      };
    }

    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    }

    default: {
      return state;
    }
  }
};

export const followAC = (userID) => ({ type: FOLLOW, userID });
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
