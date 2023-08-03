import { FC, useEffect, useState } from 'react'
import { Preloader } from '../../components/Preloader/Preloader'

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

type ChatProps = {
  ws: WebSocket
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

const Messages: FC<ChatProps> = ({ ws }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    const handleWs = (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    }

    ws?.addEventListener('message', handleWs)

    return () => {
      ws?.removeEventListener('message', handleWs)
    }
  }, [ws])

  return (
    <div style={{ maxHeight: '600px', overflow: 'auto' }}>
      {messages.map((message, i) => {
        return <Message key={i} message={message} />
      })}
    </div>
  )
}

const AddMessageFrom: FC<ChatProps> = ({ ws }) => {
  const [message, setMessage] = useState('')
  const [isReady, setIsReady] = useState(false)

  const sendMessage = (e) => {
    if (message) {
      ws?.send(message)
      setMessage('')
    }
  }

  const onMessageChange = (e) => {
    setMessage(e.currentTarget.value)
  }

  useEffect(() => {
    const handleWs = () => {
      setIsReady(true)
    }

    ws?.addEventListener('open', handleWs)

    return () => {
      ws?.removeEventListener('open', handleWs)
    }
  }, [ws])

  return (
    <>
      <form action=''>
        <textarea value={message} onChange={onMessageChange} name='' id='' cols={30} rows={1}></textarea>
        <div>
          <button type={'button'} disabled={!isReady} onClick={sendMessage}>
            Send
          </button>
        </div>
      </form>
    </>
  )
}

export const Chat: FC = () => {
  const [wsChannel, setWsChannel] = useState(null)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    let newWs: WebSocket

    const handleClose = () => {
      setTimeout(() => {
        createChannel()
      }, 3000)
    }
    const createChannel = () => {
      if (newWs !== null) {
        newWs?.removeEventListener('close', handleClose)
        newWs?.close()
      }
      newWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

      wsChannel?.addEventListener('close', () => {})
      newWs.addEventListener('close', handleClose)
      setWsChannel(newWs)
    }

    createChannel()
    setIsOnline(true)

    return () => {
      newWs?.removeEventListener('close', () => {})
      newWs?.close()
      setIsOnline(false)
    }
  }, [])

  useEffect(() => {
    wsChannel?.addEventListener('close', () => {
      console.log('CLOSE WS')
      setIsOnline(false)
    })
  }, [wsChannel])

  return (
    <div>
      {isOnline ? (
        <>
          <Messages ws={wsChannel} />
          <AddMessageFrom ws={wsChannel} />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  )
}
