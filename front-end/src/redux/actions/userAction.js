import {
  changeInfoRoute,
  createChatroomRoute,
  loginRoute,
  refreshTokenRoute,
  registerRoute,
} from '../../utils/APIRoutes';
import { getAPI, patchAPI, postAPI } from '../../utils/FetchData';
import { validInfo } from '../../utils/Valid';

export const changeInfo = (info, auth) => async dispatch => {
  const check = validInfo(info);
  const username = info.username;
  const fullname = info.fullname;
  const id = info._id;
  if (check.errLength > 0) {
    return dispatch({ type: 'ALERT', payload: { errors: check.errMsg[0] } });
  }
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await patchAPI(changeInfoRoute, { fullname, username, id });
    dispatch({
      type: 'AUTH',
      payload: { ...auth, fullname: fullname, username: username },
    });
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};

export const createChatroom = userIDs => async dispatch => {
  if (userIDs.length < 2) {
    return dispatch({
      type: 'ALERT',
      payload: { errors: 'At least 2 members to create chat room' },
    });
  }
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(createChatroomRoute, userIDs);
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};
