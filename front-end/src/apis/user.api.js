import { getAPI, postAPI } from '../utils/FetchData';
import {
  getAllContacts,
  getAllUsers,
  getMessagesRoute,
} from '../utils/APIRoutes';

export const getContacts = async userId => {
  if (userId) return await getAPI(`${getAllContacts}/${userId}`);
};

export const getUsers = async () => {
  return await getAPI(getAllUsers);
};

export const getMessageRoom = async (currentRoom, userId) => {
  console.log(userId);
  return await postAPI(`${getMessagesRoute}/${currentRoom}`, { userId });
};
