import React, { FC } from 'react'
import s from '../Dialogs.module.css'
import { Link } from 'react-router-dom'

type PropsType = {
  name: string
  id: number
}

const DialogItem: FC<PropsType> = (props) => {
  let path = '/dialogs/' + props.id

  return (
    <div className={s.dialog + ' ' + s.active}>
      <Link to={path}>{props.name}</Link>
    </div>
  )
}

export default DialogItem
