import { stopSubmit } from 'redux-form';
import { usersAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const setUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getAuthUserData = () => (dispatch) => {
  return usersAPI.getLoginStatus().then((data) => {
    if (data.resultCode === 0) {
      const { id, email, login } = data.data;
      dispatch(setUserData(id, email, login, true));
    }
  });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  usersAPI.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let action = stopSubmit('login', { _error: data.messages.length > 0 ? data.messages[0] : 'Email or password is wrong' });
      dispatch(action);
    }
  });
};

export const logout = () => (dispatch) => {
  usersAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  });
};
