const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

export let messagesData = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'How is your it-kamasutra?' },
  { id: 3, message: 'Yo' },
  { id: 4, message: 'Yo' },
  { id: 5, message: 'Yo' },
];

export let dialogsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrew' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Sasha' },
  { id: 5, name: 'Viktor' },
  { id: 6, name: 'Valera' },
];

export const dialogsReducer = (
  state = {
    dialogs: dialogsData,
    messages: messagesData,
    newMessageBody: '',
  },
  action
) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      return {
        ...state,
        newMessageBody: action.body,
      };
    }

    case SEND_MESSAGE: {
      const body = state.newMessageBody;
      const newMessage = {
        id: 6,
        message: body,
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageBody: '',
      };
    }

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageBodyCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: text,
});
