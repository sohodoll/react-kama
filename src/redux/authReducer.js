import { stopSubmit } from 'redux-form';
import { securityAPI, usersAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_CAPTCHA_URL: {
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
export const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } });

export const getAuthUserData = () => async (dispatch) => {
  const response = await usersAPI.getLoginStatus();

  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login =
  (email, password, rememberMe, captcha = 'null') =>
  async (dispatch) => {
    console.log(captcha);
    const response = await usersAPI.login(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }

      let action = stopSubmit('login', { _error: response.messages.length > 0 ? response.messages[0] : 'Email or password is wrong' });
      dispatch(action);
    }
  };

export const logout = () => async (dispatch) => {
  const response = await usersAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;

  dispatch(setCaptchaUrl(captchaUrl));
};
