import { ChatMessageType } from '../pages/ChatPage/Chat'

type SubscriberType = (messages: ChatMessageType[]) => void

const subscribers = [] as Array<SubscriberType>

let newWs: WebSocket

const handleClose = () => {
  setTimeout(() => {
    createChannel()
  }, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach((s) => s(newMessages))
}

function createChannel() {
  if (newWs !== null) {
    newWs?.removeEventListener('close', handleClose)
    newWs?.close()
  }
  newWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  newWs.addEventListener('message', messageHandler)
  newWs.addEventListener('close', handleClose)
}

export const chatAPI = {
  start() {
    createChannel()
  },

  stop() {
    subscribers.forEach((s) => s([]))
    subscribers.length = 0
    newWs?.removeEventListener('close', handleClose)
    newWs?.close()
  },

  subscribe(callback: SubscriberType) {
    subscribers.push(callback)
    return () => {
      subscribers.filter((s) => s !== callback)
    }
  },

  unsubscribe(callback: SubscriberType) {
    subscribers.filter((s) => s !== callback)
  },

  sendNewMessage(message: string) {
    newWs.send(message)
  },
}
