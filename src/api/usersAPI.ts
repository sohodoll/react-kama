import { ProfileType } from '../types/types'
import { APIResponseType, GetUsersItemsType, ResultCodesEnums, ResultCodesEnumsWithCaptcha } from './api'
import { instance } from './instance'

type LoginResponseDataType = {
  userId: number
}

type MeResponseDataType = {
  id: number
  email: string
  login: string
}

export const usersAPI = {
  getUsers: (page = 1, size = 10, term: string = '', friend: null | boolean = null) => {
    return instance
      .get<GetUsersItemsType>(`users?page=${page}&count=${size}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
      .then((response) => response.data)
  },
  getUser: (userId = 2) => {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data)
  },
  unfollowUser: (id: number) => {
    return instance.delete<APIResponseType>(`follow/${id}`).then((response) => response.data)
  },
  followUser: (id: number) => {
    return instance.post<APIResponseType>(`follow/${id}`).then((response) => response.data)
  },
  getLoginStatus: () => {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then((response) => response.data)
  },
  login: (email: string, password: string, rememberMe = false, captcha: string) => {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodesEnumsWithCaptcha | ResultCodesEnums>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data)
  },
  logout: () => {
    return instance.delete(`auth/login`).then((response) => response.data)
  },
}
