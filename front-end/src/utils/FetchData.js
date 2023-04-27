import axios from 'axios';
// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://chat-app-be1.onrender.com',
});

export const postAPI = async (url, info) => {
  const res = await axiosInstance.post(url, info);
  return res;
};

export const getAPI = async url => {
  const res = await axiosInstance.get(url);
  return res;
};

export const patchAPI = async (url, info) => {
  const res = await axios.patch(url, info);

  return res;
};
