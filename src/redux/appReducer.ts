import { getAuthUserData } from './authReducer';

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

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(setInitialized());
  });
};
