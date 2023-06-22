import { stopSubmit } from 'redux-form';
import { ResultCodesEnums, ResultCodesEnumsWithCaptcha, securityAPI, usersAPI } from '../api/api';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        asd: 'asd',
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

export type SetUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export type SetUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetUserDataActionPayloadType;
};

export const setUserData = (userId: number, email: string, login: string, isAuth: boolean): SetUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export type SetCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL;
  payload: { captchaUrl: string };
};

type ActionsType = SetUserDataActionType | SetCaptchaUrlActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } });

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await usersAPI.getLoginStatus();

  if (response.resultCode === ResultCodesEnums.Success) {
    const { id, email, login } = response.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha = 'null'): ThunkType =>
  async (dispatch) => {
    console.log(captcha);
    const response = await usersAPI.login(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodesEnumsWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }

      let action = stopSubmit('login', { _error: response.messages.length > 0 ? response.messages[0] : 'Email or password is wrong' });
      dispatch(action);
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  const response = await usersAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(setCaptchaUrl(captchaUrl));
};
