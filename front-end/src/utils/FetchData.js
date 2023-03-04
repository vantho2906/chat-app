import axios from 'axios';
// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

export const postAPI = async (url, info) => {
  const res = await axiosInstance.post(url, info);

  return res;
};

export const getAPI = async url => {
  const res = await axios.get(url);
  return res;
};

export const patchAPI = async (url, info) => {
  const res = await axios.patch(url, info);

  return res;
};
