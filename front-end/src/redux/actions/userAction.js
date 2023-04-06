import {
  changeInfoRoute,
  createChatroomRoute,
  loginRoute,
  refreshTokenRoute,
  registerRoute,
} from '../../utils/APIRoutes';
import { getAPI, patchAPI, postAPI } from '../../utils/FetchData';
import { validInfo } from '../../utils/Valid';

export const changeInfo = info => async dispatch => {
  const check = validInfo(info);
  if (check.errLength > 0) {
    return dispatch({ type: 'ALERT', payload: { errors: check.errMsg[0] } });
  }
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await patchAPI(changeInfoRoute, info);
    console.log(res);
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
    console.log(res);
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};
