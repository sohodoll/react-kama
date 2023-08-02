import { FC, useEffect, useState } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const Message = ({ message }: { message: ChatMessageType }) => {
  return (
    <div>
      <span style={{ fontWeight: '600' }}>{message.userName}</span>
      <img style={{ width: '24px' }} src={message.photo} alt={message.message} />
      <br />
      <span>{message.message}</span>
      <hr />
    </div>
  )
}

const Messages: FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    })
  }, [])

  return (
    <div style={{ maxHeight: '600px', overflow: 'auto' }}>
      {messages.map((message, i) => {
        return <Message key={i} message={message} />
      })}
    </div>
  )
}

const AddMessageFrom: FC = () => {
  const [message, setMessage] = useState('')

  const sendMessage = (e) => {
    if (message) {
      ws.send(message)
    }
  }

  const onMessageChange = (e) => {
    setMessage(e.currentTarget.value)
  }

  return (
    <>
      <form action=''>
        <textarea onChange={onMessageChange} name='' id='' cols={30} rows={1}></textarea>
        <div>
          <button onClick={sendMessage}>Send</button>
        </div>
      </form>
    </>
  )
}

export const Chat: FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageFrom />
    </div>
  )
}
