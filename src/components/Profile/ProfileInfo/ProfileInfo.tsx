import React, { ChangeEvent, FC } from 'react'
import s from './ProfileInfo.module.css'
import { Preloader } from '../../Preloader/Preloader'
import { ProfileDataForm } from './ProfileDataForm'
import { ProfileStatus } from './ProfileStatus'
import { ProfileType } from '../../../types/types'

type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = (props) => {
  const [editMode, setEditMode] = React.useState(false)

  const onPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      props.savePhoto(file)
    }
  }

  type ContactPropsType = {
    contactTitle: string
    value: string
  }

  const Contact = ({ contactTitle, value }: ContactPropsType) => {
    return (
      <div>
        <span>{contactTitle}:</span>
        <span>{value}</span>
      </div>
    )
  }

  type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goEditMode: () => void
  }

  const ProfileData = ({ profile, isOwner, goEditMode }: ProfileDataPropsType) => {
    return (
      <div>
        {isOwner && <button onClick={goEditMode}>Edit</button>}
        <p>Full name: {profile.fullName}</p>
        <p>Looking for job: {profile.lookingForAJob ? 'yes' : 'no'}</p>
        <p>About me: {profile.aboutMe ? profile.aboutMe : 'no'}</p>
        <p>Job description: {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'no'}</p>
        <div>
          <p>Contacts:</p>
          <span>
            {Object.keys(profile.contacts).map((contact) => (
              <Contact key={contact} contactTitle={contact} value={profile.contacts[contact]} />
            ))}
          </span>
        </div>
      </div>
    )
  }

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <div>
        <img className={s.icon} src={props.profile.photos.large || 'https://cdn-icons-png.flaticon.com/512/666/666201.png'} alt='' />
        {props.isOwner ? <input type='file' onChange={onPhotoSelect} /> : ''}
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt='' />
        {editMode ? (
          <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profileData={props.profile} />
        ) : (
          <ProfileData profile={props.profile} isOwner={props.isOwner} goEditMode={() => setEditMode(true)} />
        )}
        <p>
          Status: <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </p>
      </div>
    </div>
  )
}

export default ProfileInfo
