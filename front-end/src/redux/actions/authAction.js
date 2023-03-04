import {
  loginRoute,
  refreshTokenRoute,
  registerRoute,
} from '../../utils/APIRoutes';
import { getAPI, postAPI } from '../../utils/FetchData';
import { validRegister } from '../../utils/Valid';

export const register = userRegister => async dispatch => {
  const check = validRegister(userRegister);
  if (check.errLength > 0) {
    return dispatch({ type: 'ALERT', payload: { errors: check.errMsg[0] } });
  }
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(registerRoute, userRegister);
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.msg } });
  }
};

export const login = userLogin => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    console.log(123);
    const res = await postAPI(loginRoute, userLogin);
    console.log(res);
    dispatch({ type: 'AUTH', payload: res.data });
    dispatch({ type: 'ALERT', payload: { loading: false } });
    dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.msg } });
  }
};

export const refreshToken = () => async dispatch => {
  const logged = localStorage.getItem('logged');
  if (logged !== 'fe1') {
    return;
  }

  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });

    const res = await getAPI(refreshTokenRoute);
    console.log(res);

    dispatch({ type: 'AUTH', payload: res.data });

    dispatch({ type: 'ALERT', payload: {} });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response?.data.msg } });
  }
};
