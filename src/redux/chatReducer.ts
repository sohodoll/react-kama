import { Dispatch } from 'react'
import { chatAPI } from '../api/chat-api'
import { ChatMessageType } from '../pages/ChatPage/Chat'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

let initialState = {
  messages: [] as Array<ChatMessageType>,
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'MESSAGES_RECEIVED',
    payload: { messages },
  }),
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      }

    default:
      return state
  }
}

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch<any>) => {
  if (newMessageHandler !== null) return newMessageHandler
  else {
    newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }

    return newMessageHandler
  }
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendNewMessage(message)
  }

export default chatReducer
