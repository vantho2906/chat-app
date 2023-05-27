import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import LogoutAlert from './LogoutAlert';
import Toast from './Toast';
import AddGroup from './AddGroup';
import LoadingCompoent from './LoadingCompoent';
import { ToastContainer, toast } from 'react-toastify';

export const Alert = () => {
  const { alert } = useSelector(state => state);
  return (
    <>
      <div>
        {alert.loading && <Loading />}
        {alert.loadingComponent && <LoadingCompoent />}
        {alert.logout && <LogoutAlert />}
        {alert.addGroup && <AddGroup />}
      </div>
      <ToastContainer />
    </>
  );
};

export const showErrMsg = msg => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = msg => {
  return <div className="successMsg">{msg}</div>;
};
