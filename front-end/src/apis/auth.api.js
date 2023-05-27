import { loginRoute } from '../utils/APIRoutes';
import { postAPI } from '../utils/FetchData';

const signIn = async info => {
  const res = await postAPI(loginRoute, info);
  // if(res)
};
