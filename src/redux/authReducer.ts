import { stopSubmit } from 'redux-form';
import { ResultCodesEnums, ResultCodesEnumsWithCaptcha, securityAPI, usersAPI } from '../api/api';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsType>;
type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  setUserData: (userId: number, email: string, login: string, isAuth: boolean) =>
    ({
      type: 'SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),

  setCaptchaUrl: (captchaUrl: string) => ({ type: 'SET_CAPTCHA_URL', payload: { captchaUrl } } as const),
};

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
};

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'SET_CAPTCHA_URL': {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await usersAPI.getLoginStatus();

  if (response.resultCode === ResultCodesEnums.Success) {
    const { id, email, login } = response.data;
    dispatch(actions.setUserData(id, email, login, true));
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
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(actions.setCaptchaUrl(captchaUrl));
};
