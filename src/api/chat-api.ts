import { ChatMessageType } from '../pages/ChatPage/Chat'

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type StatusType = 'pending' | 'ready' | 'error'

const subscribers = {
  'message-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
}

let newWs: WebSocket

type EventNames = 'message-received' | 'status-changed'

const handleClose = () => {
  notifyStatusChange('pending')
  setTimeout(() => {
    createChannel()
  }, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['message-received'].forEach((s) => s(newMessages))
}

const openHandler = () => {
  notifyStatusChange('ready')
}

const errorHandler = (error) => {
  notifyStatusChange('error')
  console.log(error)
}

const cleanUp = () => {
  newWs?.removeEventListener('close', handleClose)
  newWs?.removeEventListener('message', messageHandler)
  newWs?.removeEventListener('error', errorHandler)
  newWs?.removeEventListener('open', openHandler)
}

const notifyStatusChange = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status))
}

function createChannel() {
  if (newWs !== null) {
    cleanUp()
    newWs?.close()
  }
  newWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifyStatusChange('pending')
  newWs.addEventListener('message', messageHandler)
  newWs.addEventListener('close', handleClose)
  newWs.addEventListener('open', openHandler)
  newWs.addEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createChannel()
  },

  stop() {
    subscribers['message-received'].forEach((s) => s([]))
    subscribers['message-received'].length = 0
    cleanUp()
    newWs?.close()
  },

  subscribe(eventName: EventNames, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      //@ts-ignore
      subscribers[eventName].filter((s) => s !== callback)
    }
  },

  unsubscribe(eventName: EventNames, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].filter((s) => s !== callback)
  },

  sendNewMessage(message: string) {
    newWs.send(message)
  },
}
