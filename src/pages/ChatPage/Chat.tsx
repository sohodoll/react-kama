/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening, sendMessage } from '../../redux/chatReducer'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'

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

type MessagesProps = {
  messages: ChatMessageType[]
}

const Messages: FC<MessagesProps> = ({ messages }) => {
  return (
    <div style={{ maxHeight: '600px', overflow: 'auto' }}>
      {messages.map((message, i) => {
        return <Message key={i} message={message} />
      })}
    </div>
  )
}

type AddMessageProps = { status: 'pending' | 'ready' | 'error' }

const AddMessageFrom: FC<AddMessageProps> = ({ status }) => {
  const [message, setMessage] = useState('')
  const dispatch: AppDispatch = useDispatch()

  const sendMessageHandler = (e) => {
    if (!message) return

    dispatch(sendMessage(message))
    setMessage('')
  }

  const onMessageChange = (e) => {
    setMessage(e.currentTarget.value)
  }

  return (
    <>
      <form action=''>
        <textarea value={message} onChange={onMessageChange} name='' id='' cols={30} rows={1}></textarea>
        <div>
          <button disabled={status === 'pending'} type={'button'} onClick={sendMessageHandler}>
            Send
          </button>
        </div>
      </form>
    </>
  )
}

export const Chat: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())

    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages messages={messages} />
      <AddMessageFrom status={status} />
    </div>
  )
}
