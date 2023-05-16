import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
});

export const usersAPI = {
  getUsers: (page = 1, size = 10) => {
    return instance
      .get(`users?page=${page}&count=${size}`, {
        withCredentials: true,
      })
      .then((response) => response.data);
  },
};
