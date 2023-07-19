import axios from 'axios'
import { PhotosType, ProfileType, UserType } from '../types/types'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '79d82f0b-b654-4c8d-b40c-bf592e72e276',
  },
})

export type APIResponseType<D = {}, RC = ResultCodesEnums> = {
  data: D
  messages: Array<string>
  resultCode: RC
}

export enum ResultCodesEnums {
  Success = 0,
  Error = 1,
}

export enum ResultCodesEnumsWithCaptcha {
  CaptchaIsRequired = 10,
}

export type GetUsersItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

type savePhotoType = {
  photos: PhotosType
}

export const profileAPI = {
  getStatus: (userId: number) => {
    return instance.get<string>(`profile/status/${userId}`).then((response) => response.data)
  },
  updateStatus: (status: string) => {
    return instance.put<APIResponseType>(`profile/status`, { status: status }).then((response) => response.data)
  },

  savePhoto: (photoFile) => {
    const formData = new FormData()
    formData.append('image', photoFile)

    return instance
      .put<APIResponseType<savePhotoType>>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
  },

  saveProfile: (profile: ProfileType) => {
    return instance.put<APIResponseType<ProfileType>>(`profile`, profile).then((response) => response.data)
  },
}

type GetCaptchaUrlType = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl: () => {
    return instance.get<APIResponseType<GetCaptchaUrlType>>(`security/get-captcha-url`).then((response) => response.data)
  },
}
