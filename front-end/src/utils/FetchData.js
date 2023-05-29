import axios from 'axios';
// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  withCredentials: true,
  credentials: 'include',
});

export const postAPI = async (url, info, token) => {
  const res = await axiosInstance.post(url, info, {
    headers: { Authorization: token },
  });
  return res;
};

export const getAPI = async (url, token) => {
  const res = await axiosInstance.get(url, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchAPI = async (url, info, token) => {
  const res = await axiosInstance.patch(url, info, {
    headers: { Authorization: token },
  });

  return res;
};
