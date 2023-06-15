import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType } from './reduxStore';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

export const appReducer = (state = initialState, action: setInitializedActionType): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type setInitializedActionType = {
  type: typeof SET_INITIALIZED;
};

export const setInitialized = (): setInitializedActionType => ({ type: SET_INITIALIZED });

type ActionsType = setInitializedActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(setInitialized());
  });
};
