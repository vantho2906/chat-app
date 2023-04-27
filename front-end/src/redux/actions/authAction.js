import {
  loginRoute,
  logoutRoute,
  refreshTokenRoute,
  registerRoute,
} from '../../utils/APIRoutes';
import { getAPI, postAPI } from '../../utils/FetchData';
import { validRegister } from '../../utils/Valid';

export const login = userLogin => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(loginRoute, userLogin);
    dispatch({
      type: 'AUTH',
      payload: { ...res.data.data, access_token: res.data.access_token },
    });
    await localStorage.setItem('chat-app', 'fe1');
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'Login success' } });
  } catch (err) {
    dispatch({
      type: 'ALERT',
      payload: { errors: err.response?.data.message },
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    dispatch({
      type: 'AUTH',
      payload: {},
    });
    localStorage.clear();
    const res = await getAPI(logoutRoute);
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'Logout success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.msg } });
  }
};

export const refreshToken = () => async dispatch => {
  const logged = await localStorage.getItem('chat-app');
  if (logged !== 'fe1') {
    return;
  }

  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });

    const res = await getAPI(refreshTokenRoute);
    dispatch({
      type: 'AUTH',
      payload: { ...res.data.user, access_token: res.data.access_token },
    });

    dispatch({ type: 'ALERT', payload: {} });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response?.data.msg } });
  }
};
