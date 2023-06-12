import axios from 'axios';
import { ProfileType } from '../types/types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '79d82f0b-b654-4c8d-b40c-bf592e72e276',
  },
});

type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnums;
  messages: Array<string>;
};

export enum ResultCodesEnums {
  Success = 0,
  Error = 1,
}

export enum ResultCodesEnumsWithCaptcha {
  CaptchaIsRequired = 10,
}

type LoginResponseTYpe = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnums | ResultCodesEnumsWithCaptcha;
  messages: Array<string>;
};

export const usersAPI = {
  getUsers: (page = 1, size = 10) => {
    return instance.get(`users?page=${page}&count=${size}`).then((response) => response.data);
  },
  getUser: (userId = 2) => {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  unfollowUser: (id: number) => {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
  followUser: (id: number) => {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
  getLoginStatus: () => {
    return instance.get<MeResponseType>(`auth/me`).then((response) => response.data);
  },
  login: (email: string, password: string, rememberMe = false, captcha: string) => {
    return instance.post<LoginResponseTYpe>(`auth/login`, { email, password, rememberMe, captcha }).then((response) => response.data);
  },
  logout: () => {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const profileAPI = {
  getStatus: (userId: number) => {
    return instance.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus: (status: string) => {
    return instance.put(`profile/status`, { status: status }).then((response) => response.data);
  },

  savePhoto: (photoFile) => {
    const formData = new FormData();
    formData.append('image', photoFile);

    return instance
      .put('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  saveProfile: (profile: ProfileType) => {
    return instance.put(`profile`, profile).then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl: () => {
    return instance.get(`security/get-captcha-url`).then((response) => response.data);
  },
};
