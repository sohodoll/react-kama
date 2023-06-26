import { InferActionsTypes } from './reduxStore';

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

const messagesData = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'How is your it-kamasutra?' },
  { id: 3, message: 'Yo' },
  { id: 4, message: 'Yo' },
  { id: 5, message: 'Yo' },
] as Array<MessageType>;

const dialogsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Sasha' },
  { id: 5, name: 'Viktor' },
  { id: 6, name: 'Valera' },
] as Array<DialogType>;

const initialState = {
  dialogs: dialogsData,
  messages: messagesData,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const body = action.newMessageBody;
      const newMessage = {
        id: 6,
        message: body,
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }

    default:
      return state;
  }
};

export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({ type: 'SEND_MESSAGE', newMessageBody } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;
