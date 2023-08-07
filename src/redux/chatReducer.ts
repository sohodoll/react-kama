import { Dispatch } from 'react'
import { chatAPI } from '../api/chat-api'
import { ChatMessageType } from '../pages/ChatPage/Chat'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

type StatusType = 'pending' | 'ready'

let initialState = {
  messages: [] as Array<ChatMessageType>,
  status: 'pending' as StatusType,
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'STATUS_CHANGED',
      payload: { status },
    } as const),
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      }

    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status,
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

let statusChangeHandler: ((status: StatusType) => void) | null = null

const statusChangeHandlerCreator = (dispatch: Dispatch<any>) => {
  if (statusChangeHandler !== null) return statusChangeHandler
  else {
    statusChangeHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }

    return statusChangeHandler
  }
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangeHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangeHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendNewMessage(message)
  }

export default chatReducer
