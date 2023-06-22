import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType, InferActionsTypes } from './reduxStore';

const actions = {
  setInitialized: () => ({ type: 'SET_INITIALIZED' as const }),
};

export type ActionsType = InferActionsTypes<typeof actions>;

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitialized());
  });
};
