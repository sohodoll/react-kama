import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '79d82f0b-b654-4c8d-b40c-bf592e72e276',
  },
})
