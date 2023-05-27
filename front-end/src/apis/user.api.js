import { getAPI } from '../utils/FetchData';
import { getAllContacts, getAllUsers } from '../utils/APIRoutes';

export const getContacts = async userId => {
  if (userId) return await getAPI(`${getAllContacts}/${userId}`);
};

export const getUsers = async () => {
  return await getAPI(getAllUsers);
};
